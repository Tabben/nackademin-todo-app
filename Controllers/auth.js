const jwt = require('jsonwebtoken');
const secret = 'secret'
const bcrypt = require('bcryptjs')
const db = require('../Model/user')

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.findUser(username)
            if(user[0]) {
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if(!result) {
                        res.json({error: "Incorrect password"})
                    } else {
                        const token = jwt.sign(user[0], secret)
                        res.json(
                            {
                                message: 'Login succeeded',
                                token: token
                            }
                        )
                    }
                })
            } else {
                res.send('Wrong username')
            }
                
        } catch (error) {
            
        }
    },
    user: (req, res, next) => {
        if (!req.headers.authorization) {

            return res.sendStatus(401)
        }
        const token = req.headers.authorization.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, secret)
            req.user = payload

            next()
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    },
    admin: (req, res, next) => {
        if (!req.headers.authorization) {

            return res.sendStatus(401)
        }
        const token = req.headers.authorization.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, secret)
            console.log(payload)
            if (payload.role != 'admin') {
                return res.sendStatus(401)
            }
            req.user = payload

            next()
        } catch (error) {
            console.log(error)
            res.sendStatus(401)
        }
    }
}