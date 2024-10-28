const express = require('express')
const {  signUp ,login, Forgotpassword, resetPassword } = require('../controllers/auth.Controllers');
const { isAuthanticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register',signUp)
router.post('/login',login)
router.post('/forgot-password',Forgotpassword)
router.post('/reset-password',resetPassword)
router.post('/logout',isAuthanticated,resetPassword)


module.exports = router;