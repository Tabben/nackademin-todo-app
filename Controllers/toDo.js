const db = require('../Model/toDo')

module.exports = {
    addList: async (req, res) => {
        let title = req.body.title
        let ownerId = req.user._id
        try {
            const task = await db.create(title, ownerId)

            res.json(task).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
        
    },

    addTask: async (req, res) => {
        let title = req.body.title
        let listId = req.params.listId
        try {
            const task = await db.add(title, listId)

            res.json(task).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
        
    },

    getTasksByList: async (req, res) => {
        let listId = req.params.listId
        try {
            const task = await db.getTasksByListId(listId)
 
            res.json(task).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
    },


    getListById: async (req, res) => {
        let listId = req.params.listId

        try {
            const list = await db.getListById(listId)

            res.json(list)
        } catch(error) {
            res.send(error)
        }
    },

    get: (req, res) => {
        res.sendFile('index.html', { root: __dirname + '/../public/views' })
    },

    setCheck: async (req, res) => {
   
        const id = req.params.taskId
        const checked = req.body.checked
 
        try {
            const task = await db.setCheck(id, checked)
 
            res.json(task).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
    },

    deleteTask: async (req, res) => {
        const id = req.params.taskId
 
        try {
           // console.log('1')
            const task = await db.deleteTask(id)
           // console.log('1')
           // console.log(task)
            res.json(task).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
    },

    // PAGINATION HANDLES EVERYTHING NOW
    // sortCreated: async (req, res) => {
    //     let sortBy = req.body.sortBy;

    //     try {
    //         const tasks = await db.sortCreated(sortBy)
 
    //         res.json(tasks).status(200)
    //     } catch (error) {
    //        // console.log("error")
    //         res.json({error: error.message})
    //     }
    // },

    // sortUpdated: async (req, res) => {
    //     let sortBy = req.body.sortBy;

    //     try {
    //         const tasks = await db.sortCreated(sortBy)
 
    //         res.json(tasks).status(200)
    //     } catch (error) {
    //        // console.log("error")
    //         res.json({error: error.message})
    //     }
    // },

    pagination: async (req, res) => {
        const sortBy = req.body.sortBy
        const sortStyle = req.body.sortStyle
        const page = req.params.page
        const listId = req.body.listId

        try {
            const tasks = await db.pagination(listId, page, sortBy, sortStyle)
 
            res.json(tasks).status(200)
        } catch (error) {
           // console.log("error")
            res.json({error: error.message})
        }
    }
}