// models/User.cent
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require("../configs/envConfig").envConfig()

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name must be at most 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email is invalid'], // Email regex pattern
    },
    password: { 
      type: String, 
      select:false,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'owner', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'customer',
    },
    profilePic: { 
      type: Object,
      default:{
        fileId:'',
        url: 'https://images.unsplash.com/photo-1727293341907-5803c9874f10?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }

    },
    bio: {
    },
    dateOfBirth: {
      type: Date,
      validator: function (value) {
        // Calculate the 2 years before the current date
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        // Ensure the date is at least 2 years in the past
        return value < twoYearsAgo;
      },
    },
    gender: { 
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other', 'none'],
        message: '{VALUE} is not a valid gender',
      },
      default: 'none',
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'City name must be at most 50 characters'],
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, 'State name must be at most 50 characters'],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [100, 'Address must be at most 100 characters'],
    },
    contact: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => /^[0-9]{10}$/.test(value), // Ensures phone has exactly 10 digits
        message: 'Phone number must be exactly 10 digits',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return ;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); 
  }
});

userSchema.methods.comparepassword = function (password) {
  
  return bcrypt.compareSync(password, this.password); // Now, `this.password` should be accessible

};


userSchema.methods.getjwttoken = function(){
  return jwt.sign(
      { id:this.id },
      process.env.JWT_SECRET,
      { expiresIn:process.env.JWT_EXPIRE }
  )
}

const User = mongoose.model('User', userSchema)
module.exports = User
