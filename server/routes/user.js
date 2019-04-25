const router = require('express').Router(),
    controllerUser = require('../controllers/user')

router.post('/register', controllerUser.registerUser)

router.post('/login', controllerUser.loginUser)

module.exports = router