const express = require('express')
const router = express.Router()
const { createProfile } = require('../domain/profile')
// POST /profiles (Create a new profile)
router.post('/', createProfile)

module.exports = router
