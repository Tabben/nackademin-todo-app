const { users } = require('./db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "secret";

module.exports = {
    addUser: async (username, password, role) => {
        return new Promise(async (resolve, reject) => {
            try {

                bcrypt.hash(password, 10, async (error, hashedPassword) => {
                    try {

                        const user = await users.insert(
                            {
                                username: username,
                                password: hashedPassword,
                                role: role
                            }
                        )
                        // console.log('user added')
                        resolve({msg: 'User was added', _id: user._id})
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
    findUser: async (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docs = await users.findOne(
                    {
                        username: username
                    }
                )
                // console.log('user search completed')
                resolve(docs)
            } catch (error) {
                // console.log(2)
                reject(error)
            }
        })
    },
    login: async (username, password) => {
        return new Promise(async (resolve, reject) => {    
            try {

                const user = await module.exports.findUser(username)
 
                if(user) {
                    
                    if(bcrypt.compareSync(password, user.password)) {
                        const token = jwt.sign(user, secret)
                        // console.log('login succeeded')
                        resolve({
                            token: token,
                            msg: 'Login suceeded'
                        })
                        
                    } else {
                        reject({msg: 'Login failed'})
                        // console.log('login failed')
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