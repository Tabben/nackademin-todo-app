const express = require('express')
const router = express.Router()
// import * as functions from '../Controller/functions'
const functions = require('../Controller/functions')




router.get('/all', functions.getAll)

router.get('/note/:id', functions.getNote)

router.post('/', functions.add)

router.put('/:id', functions.update)

router.patch('/:id', functions.set)

router.delete('/:id', functions.delete)

router.get('/', functions.get)



//export {router};

module.exports = router;