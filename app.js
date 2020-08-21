const express = require('express')
const app = express()
const routes = require('./Routes/routes')
const port = 8000;
const path = require('path')
const bodyParser = require('body-parser')

app.use('/public/Js',express.static(__dirname + '/public/Js'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

