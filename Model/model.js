// import * as database from 'nedb'

const database = require('nedb')
console.log(__dirname + '\\Data\\todo')
const todoCollection = new database({
    filename: __dirname + '/Data/todo',
    autoload: true,
    timestampData: true
})

module.exports = todoCollection