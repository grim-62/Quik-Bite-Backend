const jwt = require('jsonwebtoken')
const ErrorHendler = require('../utils/ErrorHandler');
const { asyncErrorHandler } = require('./asyncTryCatch.js');

exports.isAuthanticated = asyncErrorHandler(async(req,res,next)=>{
    const token = req.cookie;
    
    res.json(token);
   

})