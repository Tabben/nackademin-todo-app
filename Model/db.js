const database = require('nedb-promises')

var db = {
    todoCollection: database.create ({
        filename: __dirname + '/Data/todo',
        timestampData: true,
        autoload: true
    }),
    users: database.create ({
        filename: __dirname + '/Data/users',
        timestampData: true,
        autoload: true
    })
}

module.exports = db