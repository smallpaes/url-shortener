const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const crypto = require('crypto')

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

// serve static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/convert', async (req, res) => {
  const inputUrl = req.query.url
  try {
    // check if url exists in database
    const urlResult = await Url.findOne({ originalUrl: inputUrl })
    // if url already exist
    if (urlResult) { return res.status(200).json({ url: urlResult.shortenedUrl }) }
    // generate shortened url
    const shortenedUrl = crypto.randomBytes(Math.ceil((5 * 3) / 4)).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').slice(0, 5)
    // create new url document
    await Url.create({
      originalUrl: inputUrl,
      shortenedUrl
    })
    // redirect back to landing page
    res.status(200).json({ url: shortenedUrl })
  } catch (error) {
    console.log(error)
  }
})

app.get('/:shortenedUrl', (req, res) => {
  res.send('get url')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})