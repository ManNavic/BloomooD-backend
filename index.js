require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const mongoUri = process.env.DBURL
const cors = require('cors')
const tokenAuth = require('./utils/tokenAuth')

mongoose.connect(mongoUri)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
app.use(cors())
const userRouter = require('./routes/user')
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Server is running on ${port} port`)
})
