const jwt = require('jsonwebtoken');
const secret = "secret";

module.exports = {
    user: (req, res, next) => {
        if (!req.headers.token) {

            return res.sendStatus(401)
        }

        
        const token = req.headers.token.replace('Bearer ', '');

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
        if (!req.headers.token) {

            return res.sendStatus(401)
        }

        const token = req.headers.token.replace('Bearer ', '');

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
    },
    authorizedUser: (req, res, next) => {
        res.send({title: req.user.title})
    }
}