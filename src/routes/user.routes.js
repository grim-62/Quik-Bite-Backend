const express = require('express')

const {
  userProfile,
  updateProfile,
  deleteAcount,
} = require('../controllers/users.Controllers')

const router = express.Router()

router.get('/profile', userProfile)

router.put('/user-update', updateProfile)

router.delete('/delete-user', deleteAcount)

module.exports = router
