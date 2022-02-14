const jwt=require("jsonwebtoken");
const User= require("../model/user")
const { throwError } = require("./throwError");

exports.isValid = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) return next(throwError(401, "Please authenticate."));
  
      const decoded = await jwt.verify(token.replace("Bearer ", ""), "dev");
      const user = await User.findOne({ _id: decoded._id });
      if (!user) return next(throwError(401, "Please authenticate."));

      req.user = user;
      next();
    } catch (err) {
      return next(throwError(401, "Please authenticate."));
    }
  };
  