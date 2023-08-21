const { getUser, createUser } = require('../domain/user')
const express = require('express')
const router = express.Router()

// GET
router.get('/:id', getUser)
router.post('/', createUser)

module.exports = router
