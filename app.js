const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const port = 3000

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