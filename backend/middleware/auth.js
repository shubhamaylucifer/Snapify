const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


//check user is authenticated.
exports.isAuthenticated = async (req, res, next) => {
    //const { token } = req.cookies;
    const { token } = req.headers;
    console.log("token",token)
    // make sure token is exists
    if(!token) {
        return next(new ErrorResponse("your must login - token not present", 401));
    }
    try {
        //vertify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded.id",decoded.id);
        req.user = await User.findById(decoded.id);
        console.log("req.user",await User.findById(decoded.id));
        next();
    } catch (error) {
        return next(new ErrorResponse("you must login", 401));
    }
}

//middleware for admin
exports.isAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return next(new ErrorResponse("Access denied, you must ligin an admin", 401));
    }
    next();
}