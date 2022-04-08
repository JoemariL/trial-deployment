// LIBRARY IMPORTS
const mongoose = require("mongoose")
const moment = require('moment')

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

module.exports.getHdfStatistics = async(fromDate, toDate) => {
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
                'allowed': {
                    '$sum': {
                        '$cond': ['$hdf_data.allowed', 1, 0]
                    }
                }, 
                'not-allowed': {
                    '$sum': {
                        '$cond': ['$hdf_data.allowed', 0, 1]
                    }
                },
                'users': {
                    '$push': {
                        'id': '$_id', 
                        'first_name': '$first_name', 
                        'last_name': '$last_name', 
                        'age': '$age', 
                        'contact_number': '$contact_number', 
                        'home_address': '$home_address', 
                        'email_address': '$email_address', 
                        'hdf_data': '$hdf_data', 
                        'vaccination_details': '$vaccination_details'
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
    const beforeTime = moment(hdf[0].createdAt)
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