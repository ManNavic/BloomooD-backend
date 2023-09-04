const { getStoreItems, createStoreItem } = require('../domain/storeItem')
const express = require('express')
const router = express.Router()

// GET
router.get('/', getStoreItems)
// POST
router.post('/', createStoreItem)

module.exports = router
