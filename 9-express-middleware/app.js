const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

//third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//built-in middleware
app.use(express.static('public'))

//aplication level middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'kap',
      email: 'kap@gmail.com'
    },
    {
      nama: 'kap2',
      email: 'kap2@gmail.com'
    },
    {
      nama: 'kap3',
      email: 'kap3@gmail.com'
    },
  ]

  res.render('index', { layout: 'layouts/main-layout', nama: 'kap', title: 'Halaman Home', mahasiswa })
})

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', { root: __dirname })
  res.render('about', { layout: 'layouts/main-layout', title: 'Halaman About' })
})

app.get('/contact', (req, res) => {
  // res.sendFile('./contact.html', { root: __dirname })
  res.render('contact', { layout: 'layouts/main-layout', title: 'Halaman Contact' })
})

app.get('/product/:id', (req, res) => {
  res.send(`Product id : ${req.params.id} <br> Category : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('404')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})