const express = require('express')

const {
  userProfile,
  updateProfile,
  deleteAcount,
  updateAvatar,
  info
} = require('../controllers/users.Controllers')

const { isAuthanticated } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/profile',isAuthanticated, userProfile);

router.get('/info', info);

router.post('/user-update',isAuthanticated, updateProfile);

router.post('/user-avatar',isAuthanticated, updateAvatar);

router.delete('/delete-user', deleteAcount);

module.exports = router
