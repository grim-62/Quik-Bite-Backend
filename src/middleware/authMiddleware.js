const jwt = require('jsonwebtoken')
const { asyncErrorHandler } = require('./asyncTryCatch.js');
const ErrorHandler = require('../utils/ErrorHandler.js');
require('../configs/envConfig').envConfig();

exports.isAuthanticated = asyncErrorHandler(async(req,res,next)=>{
    let token  = req.cookies.token 

    if (!token) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next(); 

})