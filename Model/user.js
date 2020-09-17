const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "secret";

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    role: String
})

const users = mongoose.model('users', userSchema)

module.exports = {
    addUser: async (username, password, role) => {
        return new Promise(async (resolve, reject) => {
            try {

                bcrypt.hash(password, 10, async (error, hashedPassword) => {
                    try {
                        const details = {
                            username: username,
                            password: hashedPassword,
                            role: role
                        }
    
                        const user = await users.create(details)
                        
                        resolve({msg: 'User was added', user: user})
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
    findUserById: (userId) => {
    
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await users.findOne(
                    {
                        _id: userId
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
    deleteUser: (userId) => {
        
        return new Promise(async (resolve, reject) => {
            try {
                
                await users.deleteOne({_id: userId})
                
                
                resolve('User deleted')
            } catch (error) {
                reject(error)
            }
           
        })
    },
    login: (username, password) => {
        return new Promise(async (resolve, reject) => {    
            try {

                const user = await module.exports.findUser(username)
                
                if(user) {
                  
                    bcrypt.compare(password, user.password, (err, res) => {
                        
                        if(res) {
                            const token = jwt.sign(user.toJSON(), secret)
                            
                            console.log('login succeeded')
                            resolve({
                                token: token,
                                msg: 'Login suceeded'
                            })
                        } else {
                            reject({msg: 'LOGIn failed'})
                        }
                    }) 
                        
                        
                    
                   
                } else {
                    reject({msg:'user does not exist'})
                }
                

            } catch (error) {
                reject({msg: error.message})
            }
        })
    }
}