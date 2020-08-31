const express = require('express')
const router = express.Router()
const user = require('../Controllers/user')

router.post('/register', user.register)

router.post('/login', user.login)

module.exports = router