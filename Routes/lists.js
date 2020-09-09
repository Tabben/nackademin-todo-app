const express = require('express')
const router = express.Router()
const auth = require('../Middlewares/auth')
const toDo = require('../Controllers/toDo')

// router.get('/', auth.user, toDo.getListById)

router.post('/', auth.user, toDo.addList)

router.get('/:listId', auth.user, toDo.getListById)

router.delete('/:listId', auth.admin, toDo.deleteList)

router.patch('/:listId', auth.user, toDo.updateList)

router.post('/:listId/:page', auth.user, toDo.pagination)

module.exports = router