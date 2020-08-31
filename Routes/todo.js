const express = require('express')
const router = express.Router()
const auth = require('../Middlewares/auth')

const toDo = require('../Controllers/toDo')

router.get('/all', auth.user, toDo.getAll)

router.post('/', auth.user, toDo.add)

router.put('/:id', auth.user, toDo.update)

router.get('/note/:id', auth.user, toDo.getNote)

router.patch('/:id', auth.user, toDo.setCheck)

router.delete('/:id', auth.admin, auth.authorizedUser, toDo.delete)

router.get('/', toDo.get)

router.post('/page/:page', toDo.pagination)

//export {router};

module.exports = router;