const mongoose = require('mongoose')

const shoppingBagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StoreItem', // Reference to the StoreItem model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
})

const ShoppingBag = mongoose.model('ShoppingBag', shoppingBagSchema)

module.exports = ShoppingBag
