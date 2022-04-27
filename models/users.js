const mongoose = require('mongoose')

const hdfData = mongoose.Schema({
    entry_date: {
        type: Date,
        default: null
    },
    entry_campus: {
        type: String,
        default: null
    },
    gate_info: {
        type: String,
        default: null
    },
    allowed: {
        type: Boolean
    },
    is_expired: {
        type: Boolean,
        default: false
    },
    destination: {
        type: String,
        default: null
    },
    covid_exposure: {
        type: Boolean
    },
    covid_positive: {
        type: Boolean
    },
    fever: {
        type: Boolean
    },
    cough: {
        type: Boolean
    },
    cold: {
        type: Boolean
    },
    sore_throat: {
        type: Boolean
    },
    diff_breathing: {
        type: Boolean
    },
    diarrhea: {
        type: Boolean
    },
    others: {
        type: String,
        default: null
    },
    pregnant: {
        type: Boolean,
        default: null
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
}, { timestamps: false })

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        uppercase: true,
        immutable: true,
    },
    last_name: {
        type: String,
        uppercase: true,
        immutable: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    contact_number: {
        type: String
    },
    home_address: {
        type: String
    },
    email_address: {
        type: String,
        unique: true,
        immutable: true
    },
    department: {
        type: String,
        uppercase: true
    },
    user_type: {
        type: String,
        uppercase: true,
        immutable: true
    },
    vaccination_details: { type: Array , "default": [] },
    hdf_data: [hdfData]
}, { timestamps: true })

module.exports = user = mongoose.model('user', userSchema)