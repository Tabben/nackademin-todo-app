const express = require('express')
const app = express()
const port = 8000;
const bodyParser = require('body-parser')

const todo = require('./Routes/todo')
const user = require('./Routes/user')
const auth = require('./Routes/auth')

app.use('/public/',express.static(__dirname + '/public/'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/todo/', todo)
app.use('/user/', user)
app.use('/auth/', auth)

app.get("/", (req, res) => {
    res.redirect("/todo")
})

module.exports = app
