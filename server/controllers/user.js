const User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    { decrypt } = require('../helpers/bcrypt')

class UserController {

    static registerUser(req, res) {
        console.log(req.body)
        User
            .create({
                email: req.body.email,
                password: req.body.password
            })
            .then(function (newUser) {
                res.status(200).json(newUser)
            })
            .catch(function (err) {
                if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static loginUser(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(function (uLogin) {
                if (!uLogin) {
                    res.status(400).json({
                        message: 'Username / passwoord wrong'
                    })
                }
                else {
                    if (decrypt(req.body.password, uLogin.password) === false) {
                        res.status(400).json({
                            message: 'Username / passwoord wrong'
                        })
                    }
                    else {
                        let token = jwt.sign({ email: uLogin.email, id: uLogin._id }, process.env.SECRET)
                        res.status(200).json({ accessToken: token })
                    }
                }
            })
            .catch(function (err) {
                res.status(err)
            })
    }

}

module.exports = UserController