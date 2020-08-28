const express = require('express')
const router = express.Router()
const auth = require('../Controllers/auth')

router.post('/login', auth.login)

module.exports = router