const app = require('./app')
const database = require('./Model/db')

if(process.env.ENVIROMENT === 'dev') {
    database.connect()
}

app.listen(3000, () => {
    console.log('app started on port 3000')
})