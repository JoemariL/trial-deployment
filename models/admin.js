const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        uppercase: true,
        default: 'ADMIN'
    }, 
    isDeactivated: {
        type: Boolean,
        default: false
    }
})

module.exports = admin = mongoose.model('admin', adminSchema)