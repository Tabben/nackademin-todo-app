const database = require('nedb-promises')

require('dotenv').config();

var db


if(process.env.ENVIROMENT == 'dev') {
    db = {
        todoCollection: new database({
            filename: __dirname + '/Data/todo',
            timestampData: true,
            autoload: true
        }),
        todoList: new database({
            filename: __dirname + '/Data/todoList',
            timestampData: true,
            autoload: true
        }),
        users: new database({
            filename: __dirname + '/Data/users',
            timestampData: true,
            autoload: true
        })
    }
} else {
    db = {
        todoCollection: new database({
            filename: __dirname + '/Data/todo.test',
            timestampData: true,
            autoload: true
        }),
        todoList: new database({
            filename: __dirname + '/Data/todoList.test',
            timestampData: true,
            autoload: true
        }),
        users: new database({
            filename: __dirname + '/Data/users.test',
            timestampData: true,
            autoload: true
        })
    }
    db.todoCollection.remove({}, {multi: true})
    db.todoList.remove({}, {multi: true})
    db.users.remove({}, {multi: true})
    db.todoCollection.__original.persistence.compactDatafile();
}


module.exports = db