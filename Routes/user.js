const express = require('express')
const router = express.Router()
const user = require('../Controllers/user')

router.post('/register', user.addUser)

module.exports = router