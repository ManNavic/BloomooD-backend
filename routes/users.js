const { getUser } = require('../domain/users')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getUser)

module.exports = router
