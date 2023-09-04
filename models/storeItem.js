const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('StoreItem', StoreSchema)
