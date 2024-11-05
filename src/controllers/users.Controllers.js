const path = require('path');

const userModel = require('../models/user.model');
const imagekit = require('../utils/imagekit').initImageKit();

const { asyncErrorHandler } = require('../middleware/asyncTryCatch.js');

exports.userProfile = asyncErrorHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.id)
    res.json({user})
})
exports.updateProfile = asyncErrorHandler(async(req,res,next)=>{
    const user  = await userModel.findByIdAndUpdate(req.id, req.body);
    res.status(200).json({
        success:true,
        message:"student updated successfully"
    })
})
exports.deleteAcount = asyncErrorHandler((req,res,next)=>{
    res.send("userProfile");
})

exports.updateAvatar = asyncErrorHandler(async (req, res, next) => {
    const user = await userModel.findById(req.id);
    
    // Check if the avatar file is included in the request
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ error: "Avatar file is missing" });
    }

    const file = req.files.avatar;
    const modifiedFileName = `userAvatar-${Date.now()}${path.extname(file.name)}`;

    // Check if the user already has a profile picture and delete it if it exists
    if (user.profilePic && user.profilePic.fileId) {
        await imagekit.deleteFile(user.profilePic.fileId); 
        initImageKit
    }

    // Upload the new avatar
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    
    // Update user's profile picture with the new fileId and URL
    user.profilePic = { fileId, url };
    await user.save();

    // Respond with the new profile picture URL
    res.json({ profilePic: user.profilePic });
});

exports.info = async(req,res,next)=>{
    const user = await userModel.findById(_id = "671efa924a5caa4e5839df2f")
    res.send(user)
}