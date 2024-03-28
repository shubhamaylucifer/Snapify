const express = require('express');
const { signup, siginin, logout, userProfile } = require('../controllers/signup');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

//signup
router.post("/signup", signup);

//siginin
router.post("/signin", siginin);
 
//logout
router.get("/logout", logout);

//profile
router.get("/profile", isAuthenticated, userProfile);

module.exports = router;


