const mongoose = require('mongoose')

require('dotenv').config();

var db


if(process.env.ENVIROMENT == 'dev') {
    // db = {
    //     todoCollection: new database({
    //         filename: __dirname + '/Data/todo',
    //         timestampData: true,
    //         autoload: true
    //     }),
    //     todoList: new database({
    //         filename: __dirname + '/Data/todoList',
    //         timestampData: true,
    //         autoload: true
    //     }),
    //     users: new database({
    //         filename: __dirname + '/Data/users',
    //         timestampData: true,
    //         autoload: true
    //     })
    // }
    db = {
        getUri: async () => {
            `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`
        }
    }
    
} else {
    // db = {
    //     todoCollection: new database({
    //         filename: __dirname + '/Data/todo.test',
    //         timestampData: true,
    //         autoload: true
    //     }),
    //     todoList: new database({
    //         filename: __dirname + '/Data/todoList.test',
    //         timestampData: true,
    //         autoload: true
    //     }),
    //     users: new database({
    //         filename: __dirname + '/Data/users.test',
    //         timestampData: true,
    //         autoload: true
    //     })
    // }
    // db.todoCollection.remove({}, {multi: true})
    // db.todoList.remove({}, {multi: true})
    // db.users.remove({}, {multi: true})
    // db.todoCollection.__original.persistence.compactDatafile();

    const { MongoMemoryServer } = require('mongodb-memory-server')
    db = new MongoMemoryServer()
}

async function connect() {
    let uri = await db.getUri()
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    if (!mongoose.connection) {
        throw new MongooseError("Could not connect to database!")
    } else {
        console.log('connected to db')
    }
}

async function disconnect() {
    try {
        await mongoose.connection.close(() => {
            console.log('Database connection closed')
        });
        if(process.env.ENVIRONMENT == 'TEST'){
            await db.stop()
        }
    } catch (error) {
        console.error(error)
    }
}


module.exports = { connect, disconnect }