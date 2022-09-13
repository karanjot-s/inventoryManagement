const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/PassToken");

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      error: "Token is required",
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        error: "Token invalid",
      });

    req.user = user;
    next();
  });
};

exports.verifyUserToken = async (userId, token, res) => {
  try {
    if (!userId) {
      res.status(400).json({
        error: "User Id is required",
      });
      return false;
    }

    if (userId.length != 24) {
      res.status(400).json({
        error: "Invalid User Id",
      });
      return false;
    }

    if (!token) {
      res.status(400).json({
        error: "Token is required",
      });
      return false;
    }

    if (token.length != 64) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return false;
    }
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        error: "Invalid User Id",
      });
      return false;
    }

    const tokenObj = await Token.findOne({ token: token, userId: userId });

    if (!tokenObj) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return false;
    }

    return { user, tokenObj };
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
    return false;
  }
};

exports.verifyAccessToken = async (token, res) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(406).json({ error: "Invalid token" });

    User.findById(user.userId)
      .then((doc) => {
        return res.status(200).json({ success: true, user: doc });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Something went wrong" });
      });
  });
};
