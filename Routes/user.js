const express = require('express')
const router = express.Router()
const user = require('../Controllers/user')
const auth = require('../Middlewares/auth')

router.post('/register',  user.register)

router.post('/login', user.login)

router.delete('/', auth.admin, user.delete)

module.exports = router