const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

// import Routes
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/auth')

app.use('/api/user', authRouter)
app.use('/api/posts', postsRouter)

// Routes
app.get('/', (req, res) => {
  res.send('we are home')
})

mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connection OK!!')
)

app.listen(3000, () => console.log('server is running..'))
