const { asyncErrorHandler } = require("../middleware/asyncTryCatch.js");
const usermodel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { sendtoken } = require("../utils/SendToken.js");


exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const user = await usermodel(req.body).save();
  sendtoken(user, 201, res);
  res.status(201).json(user);
});
exports.login = asyncErrorHandler(async (req, res, next) => {
  const user = await usermodel
    .findOne({ email: req.body.email })
    .select("+password");

  if (!user) return next(new ErrorHandler("User not found", 404));
  
  const isMatch = user.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));

  sendtoken(user,200,res);
});

exports.signout = asyncErrorHandler(async (req, res, next) => {
    res.clearCookie('token')
    res.json({success:"successfully signout!"})
});

exports.Forgotpassword = asyncErrorHandler(async(req, res, next) => {
  res.send("updateProfile");
});
exports.resetPassword = asyncErrorHandler(async(req, res, next) => {
  res.send("updateProfile");
});
