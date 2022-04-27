const mongoose = require('mongoose')

const notes = mongoose.Schema({
    message_id: String,
    message: String
})

module.exports = notes = mongoose.model('notes', notes)