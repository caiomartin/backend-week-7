const express = require('express')
const app = express()


const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io
  return next()
})

app.use(cors())
app.use(express.json())
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)

mongoose.connect(
  `mongodb+srv://caio:gtz21496@cluster0-ls42e.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
)

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)
