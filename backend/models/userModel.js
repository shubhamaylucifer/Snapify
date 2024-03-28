const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'firstname required'],
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email id required'],
    unique: true,
    match: [ /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, 'Please add a valid email']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required'],
    minlength:[6, 'password must nhave 6 characters']
  },
  role: {
    type: String,
    default: "user"
  }
}, { timestamps: true})

//encrypt the pasword before saving..
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


//compare user password
userSchema.methods.comparePassword = async function (inputpassword) {
    return await bcrypt.compare(inputpassword, this.password)
}

//return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

module.exports = mongoose.model('User', userSchema);