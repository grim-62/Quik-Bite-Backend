const { asyncErrorHandler } = require('../middleware/asyncTryCatch.js')
const userModel = require('../models/user.model')

exports.userProfile = asyncErrorHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.id)
    res.json({user})
})
exports.updateProfile = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})
exports.deleteAcount = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})