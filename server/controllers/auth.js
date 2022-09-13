const User = require("../models/User");
const Token = require("../models/PassToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const {
  createJWT,
  verifyUserToken,
  verifyAccessToken,
} = require("../utils/auth");
const { sendVerificationEmail } = require("../utils/mailer");

exports.signup = (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(422).json({ error: "Password is required" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(422).json({
          error: "Email already exists",
        });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user
            .save()
            .then((response) => {
              res.status(200).json({
                success: true,
                result: response,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(422).json({ error: "Password is required" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              error: "Incorrect Password",
            });
          }

          let access_token = createJWT(user.email, user._id, 3600);
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err)
              return res.status(500).json({
                error: err,
              });

            if (decoded)
              return res.status(200).json({
                success: true,
                token: access_token,
                user: user,
              });
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.forgot = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(401).json({
        error: "Email required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        error: "Email not found",
      });
    }

    let token = await Token.findOne({ userId: user._id });

    if (token) await token.deleteOne();

    token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const link = `${process.env.FRONTEND_URL}/forgot/${user._id}/${token.token}`;

    await sendVerificationEmail(user.email, user.name, link);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.verifyToken = async (req, res) => {
  const { userId, token } = req.body;
  const doc = await verifyUserToken(userId, token, res);
  if (doc) {
    return res.status(200).json({ success: true, name: doc.user.name });
  }
};

exports.checkToken = async (req, res) => {
  const { token } = req.params;
  verifyAccessToken(token, res);
};

exports.resetPass = async (req, res) => {
  try {
    const { userId, token, password } = req.body;

    const doc = await verifyUserToken(userId, token, res);

    if (!doc) return;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

    await doc.user.updateOne({ password: hash });
    await doc.tokenObj.deleteOne();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
