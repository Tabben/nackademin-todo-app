const express = require('express')
const router = express.Router()

const toDo = require('../Controllers/toDo')

router.get('/all', toDo.getAll)

router.post('/', toDo.add)

router.put('/:id', toDo.update)

router.patch('/:id', toDo.setCheck)

router.delete('/:id', toDo.delete)

router.get('/', toDo.get)


router.post('/page/:page', toDo.pagination)

//export {router};

module.exports = router;