// LIBRARY IMPORTS
const mongoose = require("mongoose")
const moment = require('moment-timezone')

// MODEL IMPORTS
const USERS = require('../models/users')
const ADMIN = require('../models/admin')

module.exports.hdfIfExist = async (userID, hdfID) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                "hdf_data._id": mongoose.Types.ObjectId(hdfID)
            }
        }
    ])
    if(hdf === undefined || hdf.length === 0 || hdf === null) return false
    return true
}

module.exports.checkAvailableHdf = async (userID, fromDate, toDate) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                'hdf_data.createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
        {
            $match: {
                'hdf_data.entry_date': {
                    $eq: null
                }
            }
        },
        {
            '$replaceRoot': {
                'newRoot': '$hdf_data'
            }
        }
    ]).then((data) => {
        const id = data.map((payload) => {
            return payload._id
        })

        if(id.length != 0) {
            return id[0]
        } else {
            return false
        }
    }).catch(() => {return false})
}

module.exports.checkTimeIntervalHdf = async (userID, fromDate, toDate) => {
    const hdfQuery = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                'hdf_data.createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
        {
            $match: {
                'hdf_data.entry_date': {
                    $ne: null
                }
            }
        },
        {
            '$replaceRoot': {
                'newRoot': '$hdf_data'
            }
        }
    ]).sort({ createdAt: -1 })
    const currentTime = moment(new Date()).tz('Asia/Manila')
    if(hdfQuery.length != 0) {
        const recentTimeHdf = moment(hdfQuery[0].createdAt).tz('Asia/Manila')
        const timeNext = currentTime.diff(recentTimeHdf, 'hours')
        if(!timeNext) {
            return `Time till next qr scan available: ${recentTimeHdf.add(1, 'hours').format('LTS')}`
        } else {
            return "CLEAR"
        }
    } else {
        return "CLEAR"
    }
}   

module.exports.getRepeatableHdfInfo = async (userID, fromDate, toDate) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                'hdf_data.createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
        {
            $match: {
                'hdf_data.entry_date': {
                    $ne: null
                }
            }
        },
        {
            '$replaceRoot': {
                'newRoot': '$hdf_data'
            }
        }
    ]).then((data) => {
        const info = data.map((payload) => {
            return {
                covid_exposure: payload.covid_exposure,
                covid_positive: payload.covid_positive,
                allowed: payload.allowed,
                fever: payload.fever,
                cough: payload.cough,
                cold: payload.cold,
                sore_throat: payload.sore_throat,
                diff_breathing: payload.diff_breathing,
                diarrhea: payload.diarrhea,
                pregnant: payload.pregnant,
                others: payload.others
            }
        })
        if(info.length != 0) {
            return info[0]
        } else {
            return false
        }
    }).catch(() => { return false })
}

module.exports.getAllUsers = async() => {
    return await USERS.aggregate([
        {
            $match: {
                user_type: { $ne: "VISITOR"}
            },
        },
        {
            $unset: ["password", "createdAt", "__v"]
        }
    ])
}

module.exports.hdfIfExpired = async (userID, hdfID) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(hdfID)
            }
        }
    ])
    if(hdf[0].is_expired) return true
    return false
}

module.exports.getUserDetails = async(userID) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $sort: {
                "hdf_data.createdAt": -1
            }
        },
        {
            $unset: ["password", "createdAt", "updatedAt", "__v"]
        }
    ])
}

module.exports.getHdfStatistics = async(fromDate, toDate, currentDate) => {
    return await USERS.aggregate([
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                'hdf_data.entry_date': {
                    $ne: null
                }
            }
        },
        {
            $match: {
                'hdf_data.createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
        {
            $group: {
                '_id': {
                    'school': '$hdf_data.entry_campus',
                    'gate': '$hdf_data.gate_info'
                },
                'date': {
                    '$first': currentDate
                },
                'allowed': {
                    '$sum': {
                        '$cond': ['$hdf_data.allowed', 1, 0]
                    }
                }, 
                'not_allowed': {
                    '$sum': {
                        '$cond': ['$hdf_data.allowed', 0, 1]
                    }
                },
                'total_entry': {
                    '$sum': 1
                },
                'students': {
                    $sum: {
                        '$cond': [{ $eq: ["$user_type", "STUDENT"]}, 1, 0]
                    }
                },
                'employees': {
                    $sum: {
                        '$cond': [{ $eq: ["$user_type", "EMPLOYEE"]}, 1, 0]
                    }
                },
                'visitors': {
                    $sum: {
                        '$cond': [{ $eq: ["$user_type", "VISITOR"]}, 1, 0]
                    }
                },
                'users': {
                    '$push': {
                        'id': '$_id',
                        'first_name': '$first_name', 
                        'last_name': '$last_name', 
                        'contact_number': '$contact_number', 
                        'home_address': '$home_address', 
                        'email_address': '$email_address', 
                        'hdf_data': '$hdf_data', 
                        'vaccination_details': '$vaccination_details',
                        'department': '$department',
                        'user_type': '$user_type'
                    }
                }
            }
        }
    ]).sort({ createdAt: -1 })
}

module.exports.getHdfTodayUser = async(userID, fromDate, toDate) => {
    return await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                createdAt: {
                    $gt: fromDate, $lt: toDate
                }
            }
        },
    ])
}

module.exports.hdfIfExistDay = async(userID, fromDate, toDate) => {
    const hdf =  await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        },
        {
            $match: {
                'createdAt': {
                    $gt: fromDate, $lt: toDate
                }
            }
        }
    ])
    if(hdf === undefined || hdf.length === 0 || hdf === null) return true
    return false
}

module.exports.hdfIfOver = async(userID, hdfID, dateFrom) => {
    const hdf = await USERS.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userID)
            }
        },
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                "hdf_data._id": mongoose.Types.ObjectId(hdfID)
            }
        },
        {
            $replaceRoot: {
                newRoot: "$hdf_data"
            }
        }
    ])
    const beforeTime = moment(hdf[0].createdAt).tz('Asia/Manila')
    if(beforeTime.isBefore(dateFrom)) return true
    return false
}

module.exports.getVisitor = async(date) => {
    return await USERS.aggregate([
        {
            $match: {
                user_type: "VISITOR"
            }
        },
        {
            $match: {
                createdAt: {
                    $lt: date
                }
            }
        }
    ])
} 

module.exports.getExpiredHDF = async(date) => {
    return await USERS.aggregate([
        {
            $unwind: {
                path: "$hdf_data"
            }
        },
        {
            $match: {
                "hdf_data.createdAt": {
                    $lt: date
                }
            }
        }
    ])
}