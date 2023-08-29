const { createContactUs } = require('../domain/contactUs')
const express = require('express')
const router = express.Router()

router.post('/', createContactUs)

module.exports = router
