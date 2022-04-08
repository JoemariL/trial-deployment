const mongoose = require('mongoose')

const schoolSchema = mongoose.Schema({
    school: {
        type: String
    },
    gate: {
        type: String
    },
    raw_code: {
        type: String,
        unique: true
    },
    generated_code: {
        type: String
    }
})

module.exports = school = mongoose.model('school', schoolSchema)