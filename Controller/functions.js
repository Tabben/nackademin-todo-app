const todoCollection = require('../Model/model')
// import {todoCollection} from '../Model/model.js' 


module.exports = {
    add: (req, res) => {
        let title = req.body.title

        todoCollection.insert({checked: false, title: title}, (err, docs) => {
            if (err) {
                res.send(err)
            } else {
                res.send(docs)
            }
        })
    },

    getAll: (req, res) => {
        todoCollection.find({}, (err, docs) => {
            if (!err) {
                res.send(docs)
            }
        })
    },

    getNote: (req, res) => {
        todoCollection.find({_id: req.params.id}, (err, docs) => {
            if (!err) {
                res.send(docs)
            }
        })
    },

    get: (req, res) => {
        // todoCollection.find({}, (err, docs) => {
        //     if(!err) {

        //     }
        // })
        res.sendFile('index.html', { root: __dirname + '/../public/views' })
    },

    update: (req, res) => {
        console.log(req.body)
        const title = req.body.title
        const checked = req.body.checked
        console.log(req.params.id)
        todoCollection.update({ _id: req.params.id}, { $set: { title: title, checked: checked } }, (err, docs) => {
            if (err) {
                res.send(err)
            } else {
                if(docs == 1) {
                    console.log('updated' + docs)
                    
                } else {
                    console.log('not updated ' + docs)
                }
                res.sendStatus(201)
            }
        })
    },

    set: (req, res) => {
        console.log(req.body)

        const checked = req.body.checked
        console.log(req.params.id)
        todoCollection.update({ _id: req.params.id}, { $set: { checked: checked } }, (err, docs) => {
            if (err) {
                res.send(err)
            } else {
                if(docs == 1) {
                    console.log('updated' + docs)
                    
                } else {
                    console.log('not updated ' + docs)
                }
                res.sendStatus(201)
            }
        })
    },

    delete: (req, res) => {
        todoCollection.remove({ _id: req.params.id },{} ,(err, docs) => {
            if (err) {
                res.send(err)
            } else {
                res.send('deleted')
            }
        })
    },

    sortCreated: (req, res) => {
        let sortBy = req.body.sortBy;

        todoCollection.find({}).sort({createdAt: sortBy}).limit(5).exec((err, docs) => {
            if(err) {
                console.log(err)
            } else {
                // console.log(docs)
                res.send(docs)
            }
            
        })
    },

    sortUpdated: (req, res) => {
        let sortBy = req.body.sortBy;

        todoCollection.find({}).sort({updatedAt: sortBy}).limit(5).exec((err, docs) => {
            if(err) {
                console.log(err)
            } else {
                // console.log(docs)
                res.send(docs)
            }
            
        })
    }
}