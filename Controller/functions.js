const db = require('../Model/model')
// import {db} from '../Model/model.js' 


module.exports = {
    add: async (req, res) => {
        let title = req.body.title
        try {
            const note = await db.add(title)

            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
        
    },

    getAll: async (req, res) => {
        try {
            const note = await db.getAll()
 
            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    getNote: async (req, res) => {
        const id = req.params.id
        try {
            const note = await db.getNote(id)
 
            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    get: (req, res) => {

        res.sendFile('index.html', { root: __dirname + '/../public/views' })
    },

    update: async (req, res) => {
        const id = req.params.id
        const title = req.body.title
        const checked = req.body.checked
        try {
            const note = await db.update(id, title, checked)
 
            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    setCheck: async (req, res) => {
   
        const id = req.params.id
        const checked = req.body.checked
        try {
            const note = await db.setCheck(id, checked)
 
            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    delete: async (req, res) => {
        const id = req.params.id
 
        try {
            const note = await db.delete(id)
 
            res.json(note).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    sortCreated: async (req, res) => {
        let sortBy = req.body.sortBy;

        try {
            const notes = await db.sortCreated(sortBy)
 
            res.json(notes).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    sortUpdated: async (req, res) => {
        let sortBy = req.body.sortBy;

        try {
            const notes = await db.sortCreated(sortBy)
 
            res.json(notes).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    },

    pagination: async (req, res) => {
        let sortBy = req.body.sortBy;
        const page = req.params.page
        try {
            const notes = await db.pagination(page, sortBy, )
 
            res.json(notes).status(200)
        } catch (error) {
            console.log("error")
            res.json({error: error.message}).status(500)
        }
    }
}