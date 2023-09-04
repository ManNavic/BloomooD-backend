const StoreItem = require('../models/storeItem')

const getStoreItems = async (req, res) => {
  try {
    const query = {}
    if (req.query.category) {
      query.category = req.query.category
      const storeItems = await StoreItem.find(query)
      if (!storeItems) {
        return res.status(404).json({ message: 'Store items not found' })
      }
      return res.json(storeItems)
    } else {
      const storeItems = await StoreItem.find()
      if (!storeItems) {
        return res.status(404).json({ message: 'Store items not found' })
      }
      return res.json(storeItems)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createStoreItem = async (req, res) => {
  try {
    const storeItem = new StoreItem({
      name: req.body.name,
      latinName: req.body.latinName,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      category: req.body.category
    })
    const newStoreItem = await storeItem.save()
    res.status(201).json(newStoreItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { getStoreItems, createStoreItem }
