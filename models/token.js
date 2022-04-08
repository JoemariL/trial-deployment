const mongoose = require('mongoose')

const tokenData = mongoose.Schema({
    createdAt: {
        type: Date,
        expires: '6d',
        default: Date.now,
    },
    token: {
        type: String,
    }
}, {
    timestamps: false
})

module.exports = token = mongoose.model('token', tokenData)