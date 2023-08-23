const { getFeed, createFeed } = require('../domain/feed')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getFeed)
// POST
router.post('/', createFeed)

module.exports = router
