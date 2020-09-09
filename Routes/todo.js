const express = require('express')
const router = express.Router()
const auth = require('../Middlewares/auth')

const toDo = require('../Controllers/toDo')

// router.get('/', auth.user, toDo.getAll)

router.post('/list', auth.user, toDo.addList)

router.get('/list/:listId', auth.user, toDo.getListById)

router.delete('/list/:listId', auth.admin, toDo.deleteList)

router.patch('/list/:listId', auth.user, toDo.updateList)

router.get('/tasks/:listId', auth.user, toDo.getTasksByList)

router.post('/tasks/:listId', auth.user, toDo.addTask)

router.patch('/tasks/:taskId', auth.user, toDo.setCheck)

router.delete('/tasks/:taskId', auth.admin, toDo.deleteTask)

// router.get('/', toDo.get)

// router.post('/page/:page', toDo.pagination)

//export {router};

module.exports = router;