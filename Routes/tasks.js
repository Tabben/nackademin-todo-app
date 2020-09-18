const express = require('express')
const router = express.Router()
const auth = require('../Middlewares/auth')

const toDo = require('../Controllers/toDo')


router.get('/:listId', auth.user, toDo.getTasksByList)

router.post('/:listId', auth.user, toDo.addTask)

router.patch('/check/:taskId', auth.user, toDo.setCheck)

router.patch('/urgent/:taskId', auth.user, toDo.setUrgent)

router.delete('/:taskId', auth.admin, toDo.deleteTask)


module.exports = router;