require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const mongoUri = process.env.DBURL

async function connect() {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
}
connect()
app.listen(port, () => {
  console.log(`Server is running on ${port} port`)
})
