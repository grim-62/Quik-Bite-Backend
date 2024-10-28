// models/User.cent
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require("../configs/envConfig").envConfig()

const userSchema = new mongoose.Schema(
  {
    name: { type: String, 
        required: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
      type: String,
      enum: ['customer', 'owner', 'admin'],
      default: 'customer',
    },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password)
}
userSchema.methods.getjwttoken = function(){
  return jwt.sign(
      { id:this.id },
      process.env.JWT_SECRET,
      { expiresIn:process.env.JWT_EXPIRE }
  )
}

const User = mongoose.model('User', userSchema)
module.exports = User
