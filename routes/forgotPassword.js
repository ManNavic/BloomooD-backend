const { getPassword } = require('../domain/forgotPassword')
const express = require('express')
const router = express.Router()

router.post('/', getPassword)

module.exports = router
