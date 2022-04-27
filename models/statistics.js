const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    date: String,
    info: { type: Array, "default": []}
})

module.exports = statistics = mongoose.model('statistics', statSchema)