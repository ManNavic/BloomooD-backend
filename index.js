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

// Routers
// User router
const registerRouter = require('./routes/register')
app.use('/register', registerRouter)
// Feed router
const feedRouter = require('./routes/feed')
app.use('/feed', feedRouter)

const loginRouters = require('./routes/login')
app.use('/login', loginRouters)
const usersRouters = require('./routes/users')
app.use('/users', tokenAuth, usersRouters)
const profileRouters = require('./routes/profile')
app.use('/profile', tokenAuth, profileRouters)

app.listen(port, () => {
  console.log(`Server is running on ${port} port`)
})
