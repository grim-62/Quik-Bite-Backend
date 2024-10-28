const express = require('express')
const {  signUp, resetPassword, signIn, signOut, forgotPassword } = require('../controllers/auth.Controllers');
const { isAuthanticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sign-up',signUp);
router.post('/sign-in',signIn);
router.post('/sign-out',isAuthanticated,signOut);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

module.exports = router;