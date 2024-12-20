const { asyncErrorHandler } = require("../middleware/asyncTryCatch.js");
const usermodel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { sendtoken } = require("../utils/SendToken.js");


exports.signUp = asyncErrorHandler(async (req, res, next) => {
  const user = await usermodel(req.body).save();
  sendtoken(user, 201, res);
  res.status(201).json(user);
});
exports.signIn = asyncErrorHandler(async (req, res, next) => {
  
 
  const user = await usermodel.findOne({ email: req.body.email }).select("+password");
  
  if (!user)   return next(new ErrorHandler("User with such email does not exist", 401))
    
    const isMatch = user.comparepassword(req.body.password)
    if (!isMatch)   return next(new ErrorHandler("Invalid Credentials", 401))
      // console.log(user);

  sendtoken(user,200,res);
});

exports.signOut = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.json({message : " sign-out successfully"});

});

exports.forgotPassword = asyncErrorHandler(async(req, res, next) => {
  res.send("updateProfile");
});
exports.resetPassword = asyncErrorHandler(async(req, res, next) => {
  res.send("updateProfile");
});
