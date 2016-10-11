'use strict'

const express = require('express')
const app = express()

app.use('/dist', express.static('dist'))
app.use('/', function (request, response) {
  response.sendFile('index.html', {root: __dirname})
})

app.listen(8080)
