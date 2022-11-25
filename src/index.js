const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv')

dotenv.config()

const controllers = require('./controllers')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors());
app.use(express.json());

app.use('/', controllers)

app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`)
})