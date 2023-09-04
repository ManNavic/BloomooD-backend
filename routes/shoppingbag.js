const express = require('express')
const router = express.Router()
const addToShoppingBag = require('../domain/shoppingBag')
// POST request to add a product to the shopping bag
router.post('/add', addToShoppingBag)

module.exports = router
