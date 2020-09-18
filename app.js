const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const tasks = require('./Routes/tasks')
const lists = require('./Routes/lists')
const user = require('./Routes/user')
const auth = require('./Routes/auth')

app.use('/public/', express.static(__dirname + '/public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/tasks/', tasks)
app.use('/list/', lists)
app.use('/user/', user)
app.use('/auth/', auth)

app.get("/", (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public/views' })
})

module.exports = app
