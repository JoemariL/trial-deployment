const mongoose = require('mongoose')
const schedule = require('node-schedule')
const moment = require('moment')

const USERS = require('../models/users')
const { getVisitor, getExpiredHDF } = require('./pipelines')

const autoDeleteVisitor = async () => {
    const date = moment().startOf('day').add(-15, 'days').toDate()
    const user = await getVisitor(date)
    if(user.length != 0 || user.length != null) {
        for(let i = 0; i < user.length; i++) {
            await USERS.deleteOne({ _id: user[i]._id})
        }
    }
}

const autoDeleteHDF = async () => {
    const date = moment().startOf('day').add(-15, 'days').toDate()
    const user = await getExpiredHDF(date)
    if(user.length != 0 || user.length != null) {
        for(let i = 0; i < user.length; i++) {
            await USERS.findByIdAndUpdate(
                user[i]._id,
                {
                    $pull: {
                        hdf_data: { _id: mongoose.Types.ObjectId(user[i].hdf_data._id)}
                    }
                }
            )
        }
    }
}

module.exports = () => {
    schedule.scheduleJob('0 0 * * *', () => {
        autoDeleteVisitor()
        autoDeleteHDF()
        console.log('scheduler check run.')
    })
}