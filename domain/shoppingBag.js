const ShoppingBag = require('../models/shoppingbag')
const addToShoppingBag = async (req, res) => {
  try {
    const userId = req.user._id // Extract user ID from authentication
    const productId = req.body.productId // Product ID to add to the bag

    // Find the user's shopping bag
    let shoppingBag = await ShoppingBag.findOne({ user: userId })

    if (!shoppingBag) {
      // If shopping bag doesn't exist, create a new one
      shoppingBag = new ShoppingBag({ user: userId, items: [] })
    }

    // Add the product to the bag
    const existingItem = shoppingBag.items.find(
      (item) => item.product.toString() === productId
    )
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      shoppingBag.items.push({ product: productId, quantity: 1 })
    }

    // Save the shopping bag
    await shoppingBag.save()

    res.json({ message: 'Product added to shopping bag' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { addToShoppingBag }
