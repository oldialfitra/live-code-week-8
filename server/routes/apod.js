const router = require('express').Router(),
    controllerApod = require('../controllers/apod')

router.post('/', controllerApod.createApod)

router.get('/', controllerApod.getAllApod)

router.get('/:id', controllerApod.getOneApod)

router.delete('/:id', controllerApod.deleteApod)

router.put('/:id', controllerApod.updateApod)

module.exports = router