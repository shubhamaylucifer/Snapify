const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/userModel');
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if(userExists) {
        return next(new ErrorResponse("Email id already exists", 400));
    }

    try {
        const  user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

//signin..
exports.siginin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if(!email || !password) {
            return next(new ErrorResponse("please add an email/password", 403));
        }
        //check user is present 
        const user = await User.findOne({ email });
        if(!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        //check password
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new ErrorResponse("invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      id: user._id,
      role: user.role,
      token: token,
    });
};

//logout
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logout user"
    })
}

//user profile
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
        success: true,
        user
    })
}