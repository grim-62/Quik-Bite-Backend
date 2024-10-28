const express = require('express')

const {
  userProfile,
  updateProfile,
  deleteAcount,
} = require('../controllers/users.Controllers')

const { isAuthanticated } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/profile',isAuthanticated, userProfile)

router.put('/user-update', updateProfile)

router.delete('/delete-user', deleteAcount)

module.exports = router
