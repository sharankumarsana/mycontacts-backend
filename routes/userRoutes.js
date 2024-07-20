const express = require('express')
const router = express.Router()
const {registerUser, getCurrentUser, loginUser} = require('../controllers/userController')
const validateToken = require('../middleware/validTokenHandler')

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validateToken,getCurrentUser)

module.exports = router 