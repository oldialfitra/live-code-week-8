const jwt = require('jsonwebtoken')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.hasOwnProperty('access-token')) {
            try {
                req.userLoggedIn = jwt.verify(req.headers['access-token'], process.env.SECRET)
                console.log(req.userLoggedIn)
                next();
            }
            catch {
                res.status(401).json({ message: `You are not Authenticate` })
            }
        }
        else {
            res.status(401).json({ message: `Login First` })
        }
    }
}