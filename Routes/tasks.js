const express = require('express')
const router = express.Router()
const auth = require('../Middlewares/auth')

const toDo = require('../Controllers/toDo')

// router.get('/', auth.user, toDo.getAll)

router.get('/:listId', auth.user, toDo.getTasksByList)

router.post('/:listId', auth.user, toDo.addTask)

router.patch('/:taskId', auth.user, toDo.setCheck)

router.delete('/:taskId', auth.admin, toDo.deleteTask)

// router.get('/', toDo.get)



//export {router};

module.exports = router;