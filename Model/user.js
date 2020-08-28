const { users } = require('./db')

module.exports = {
    addUser: (username, password, role) => {
       
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = users.insert(
                    {
                        username: username,
                        password: password,
                        role: role
                    }
                )
                
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    }
}