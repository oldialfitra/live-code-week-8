const bcryptjs = require('bcryptjs')

module.exports = {
    encrypt(password) {
        return bcryptjs.hashSync(password, 8)
    },
    decrypt(password, hash) {
        return bcryptjs.compareSync(password, hash)
    }
}