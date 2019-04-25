const router = require('express').Router(),
    routerUser = require('./user'),
    routerApod = require('./apod'),
    {authentication} = require('../middleware/auth')

router.use('/users', routerUser)

router.use('', authentication)

router.use('/apods', routerApod)

module.exports = router