const express = require('express')
const {authUser, registerUser, getAllUsers, getUserProfile, updateUserProfile} = require("../controllers/userController.js")
const {protect, admin} = require('../middleware/authMiddleware.js')
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router