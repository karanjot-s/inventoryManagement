const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateProfile = (req, res) => {
  let { name } = req.body;
  let user = req.user;

  user.name = name;

  User.findByIdAndUpdate(req.user.userId, user, (err, doc) => {
    if (err)
      return res.status(500).json({
        error: "Something went wrong",
      });

    return res.status(200).json({
      success: true,
      user: doc,
    });
  });
};

exports.updatePassword = async (req, res) => {
  try {
    let { oldPassword, password } = req.body;

    const user = await User.findById(req.user.userId);

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({
        error: "Incorrect password",
      });
    }

    if (oldPassword === password) {
      return res.status(401).json({
        error: "New Password is same as old one",
      });
    }

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

    await user.updateOne({ password: hash });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
