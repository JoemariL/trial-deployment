const mongoose = require('mongoose')
const schedule = require('node-schedule')
const moment = require('moment-timezone')

const USERS = require('../models/users')
const STATISTICS = require('../models/statistics')

const { getVisitor, getExpiredHDF, getHdfStatistics } = require('./pipelines')
const { countDepartments } = require('./functions')

const autoDeleteVisitor = async () => {
    const date = moment().tz('Asia/Manila').startOf('day').add(-15, 'days').toDate()
    const user = await getVisitor(date)
    if(user.length != 0 || user.length != null) {
        for(let i = 0; i < user.length; i++) {
            await USERS.deleteOne({ _id: user[i]._id})
        }
    }
}

const autoDeleteHDF = async () => {
    const date = moment().tz('Asia/Manila').startOf('day').add(-15, 'days').toDate()
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

const autoGenerateReport = async () => {
    let dateToday = moment().tz('Asia/Manila').startOf('day').toDate()
    let dateTomorrow = moment().tz('Asia/Manila').startOf('day').add(1, 'days').toDate()
    let dateNow = moment().tz('Asia/Manila').format("MMM Do YYYY")

    const data = await getHdfStatistics(dateToday, dateTomorrow, dateNow)
    if(data.length != 0 || data != null) {
        const result = countDepartments(data)
        const stats = result.map(data => {
            return {
                school: data._id.school,
                gate: data._id.gate,
                allowed: data.allowed,
                not_allowed: data.not_allowed,
                total_entry: data.total_entry,
                students: data.students,
                employees: data.employees,
                visitors: data.visitors,
                department_list: data.department_list
            }
        })
    
        const newStats = new STATISTICS({
            date: dateNow,
            info: stats
        })
    
        await newStats.save()
    }
}

module.exports = () => {
    schedule.scheduleJob('0 0 * * *', () => {
        autoGenerateReport()
        autoDeleteVisitor()
        autoDeleteHDF()
        console.log('automated system check run')
    })
}