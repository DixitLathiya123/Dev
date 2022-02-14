const { throwError } = require("../middleware/throwError");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.singup = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return next(throwError(500, "Email is already exist"));
    }
    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = await bcrypt.hash(password, 8);
    await user.save();
    res.status(201).json({
      message: "Your Profile Add Successfully.",
      data: user,
    });
  } catch (error) {
    return next(throwError(422, "Somthing want wrong."));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(throwError(500, "User not found."));
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return next(throwError(500, "invailed password."));
    }
    const token = await jwt.sign({ _id: user._id }, 'dev');
    user.password = undefined;
    res.json({
      message: "Login Successfully.",
      data: user,
      token: token,
    });
  } catch (error) {
    return next(throwError(500, "Somthing want wrong."));
  }
};