const { users } = require('./db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "secret";

module.exports = {
    addUser: (username, password, role) => {
        return new Promise(async (resolve, reject) => {
            try {
                bcrypt.hash(password, 10, async (error, hashedPassword) => {
                    try {
                        const docs = users.insert(
                            {
                                username: username,
                                password: hashedPassword,
                                role: role
                            }
                        )
                        resolve('User was added')
                    } catch (error) {
                        reject(error)
                    }
                })

                resolve()
            } catch (error) {
                reject(error)
            }
        })
    },
    findUser: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docs = users.findOne(
                    {
                        username: username
                    }
                )
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    login: async (username, password) => {
        return new Promise(async (resolve, reject) => {    
            try {

                const user = await module.exports.findUser(username)

                if(user) {
                    console.log(user)
                    
                    if(bcrypt.compareSync(password, user.password)) {
                        reject({msg: 'Login failed'})
                        console.log(username + 'failed')
                    } else {
                        const token = jwt.sign(user, secret)
                        console.log(username + 'scucess')
                        resolve({
                            token: token,
                            msg: 'Login suceeded'
                        })
                    }
                   
                } else {
                    reject({msg:'user does not exist'})
                }
                

            } catch (error) {
                reject({msg: error.message})
            }
        })
    }
}