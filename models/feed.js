const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  }
})
module.exports = mongoose.model('Feed', feedSchema)
