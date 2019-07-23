const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const port = 3000

// connect mongoose with database
mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true })

const db = mongoose.connection

// error connection
db.on('error', () => {
  console.log('mongodb error!')
})

// successful connection
db.once('open', () => {
  console.log('mongodb connected!')
})

// Include user model
const Url = require('./models/url')

// set up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/:originalUrl', (req, res) => {
  res.send('post url')
})

app.get('/:shortenedUrl', (req, res) => {
  res.send('get url')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})