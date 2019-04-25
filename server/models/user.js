const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { encrypt } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        validate: [{
            validator: function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            message: 'Email not valid'
        }, {
            validator: function uniqueEmail(inputEmail) {
                return new Promise((resolve, reject) => {
                    this.model('user').findOne({
                        email: inputEmail
                    })
                        .then(function (result) {
                            if (result) {
                                throw new Error('Email already exists')
                            } else {
                                resolve()
                            }
                        })
                        .catch(function (err) {
                            reject(err.message)
                        })
                })
            }
        }]
    },
    password: {
        type: String,
        minlength: [6, 'Minimal 6 characters'],
        required: [true, 'Password required']
    },
    tags: [{
        type: String
    }]
}, {
        timestamps: {}
    })

userSchema.pre('save', function (next) {
    this.password = encrypt(this.password)
    next()
})

const Users = mongoose.model('user', userSchema)
module.exports = Users