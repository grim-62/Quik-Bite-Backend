const { asyncErrorHandler } = require('../middleware/asyncTryCatch.js')
const User = require('../models/user.model')

exports.userProfile = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})
exports.updateProfile = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})
exports.deleteAcount = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})