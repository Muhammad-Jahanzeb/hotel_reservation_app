const express = require('express')
const { registerUser, loginUser } = require('../controller/auth')
const routerAuth = express.Router()

routerAuth.post('/auth/register', registerUser )

routerAuth.post('/auth/login', loginUser)

module.exports = routerAuth