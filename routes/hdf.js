// LIBRARY IMPORT 
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const moment = require('moment-timezone')

// MODEL IMPORT 
const USERS = require('../models/users')
const SCHOOL = require('../models/school')

// UTILS IMPORT 
const { objectIDValidator } = require('../utils/validator')
const { hdfIfExist, hdfIfExpired, getHdfTodayUser, getHdfStatistics, checkAvailableHdf, getRepeatableHdfInfo, checkTimeIntervalHdf } = require('../utils/pipelines')
const { decryptJSON, countDepartments } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

// GET HDF DATA FOR THE DAY.
router.get("/day", async (req, res) => {
    let dateToday = moment().tz('Asia/Manila').startOf('day').toDate()
    let dateTomorrow = moment().tz('Asia/Manila').startOf('day').add(1, 'days').toDate()
    let dateNow = moment().format("MMM Do YYYY")

    try {
        const data = await getHdfStatistics(dateToday, dateTomorrow, dateNow)
        if(!data) return res.status(404).json({ errors:{ message:'not found' }})
        const result = countDepartments(data)
    
        return res.status(200).json(result) 
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET HDF DATA FOR SPECIFIC USER WITH-IN A DAY
router.get("/day-user", async (req, res) => {
    let dateToday = moment().tz('Asia/Manila').startOf('day').toDate()
    let dateTomorrow = moment().tz('Asia/Manila').startOf('day').add(1, 'days').toDate()

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    try {
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

        const userHdf = await getHdfTodayUser(user._id, dateToday, dateTomorrow)
        if(!userHdf) return res.status(404).json({ errors:{ message:'not found' }})

        const hdf = userHdf.slice().sort((a, b) => b.createdAt - a.createdAt)
        return res.status(200).json(hdf)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

// GENERATE HDF DATA FOR SPECIFIC USER
router.post("/generate", auth, async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const { covidExposure, covidPositive, fever, cough, cold, soreThroat, diffBreathing, diarrhea, others, pregnant } = req.body

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    let allowed = true
    if(covidExposure || covidPositive || fever || cough || cold || soreThroat || diffBreathing || diarrhea) allowed = false

    const hdfID = new mongoose.Types.ObjectId()
    const hdfData = {
        _id: hdfID,
        allowed,
        covid_exposure: covidExposure,
        covid_positive: covidPositive,
        fever,
        cough,
        cold,
        sore_throat: soreThroat,
        diff_breathing: diffBreathing,
        diarrhea,
        others,
        pregnant
    }

    const uid = user._id
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            { $push: { "hdf_data": hdfData }},
            { new: true}
        )
        if(newHdfData) return res.status(201).json({ _id: hdfID })
        return res.status(400).json({ errors:{ message:'user hdf form add failed' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// HDF QR SCAN
router.post("/scan", async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const { destination } = req.body

    const userUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    let dateToday = moment().tz('Asia/Manila').startOf('day').toDate()
    let dateTomorrow = moment().tz('Asia/Manila').startOf('day').add(1, 'days').toDate()

    let hdfUid = null
    const availableId = await checkAvailableHdf(userUid, dateToday, dateTomorrow)
    const timeIntervalCheck = await checkTimeIntervalHdf(userUid, dateToday, dateTomorrow)
    if(timeIntervalCheck !== "CLEAR") return res.status(400).json({ errors: { message: timeIntervalCheck }})

        if (availableId) {
            hdfUid = availableId
        } else {
            const userHdf = await getHdfTodayUser(userUid, dateToday, dateTomorrow)
            if(!userHdf.length) return res.status(404).json({ errors:{ message:'no hdf found' }})
            const payload = await getRepeatableHdfInfo(userUid, dateToday, dateTomorrow)
            const newID = new mongoose.Types.ObjectId()
            const hdfData = {
                _id: newID,
                allowed: payload.allowed,
                covid_exposure: payload.covid_exposure,
                covid_positive: payload.covid_positive,
                fever: payload.fever,
                cough: payload.cough,
                cold: payload.cold,
                sore_throat: payload.sore_throat,
                diff_breathing: payload.diff_breathing,
                diarrhea: payload.diarrhea,
                others: payload.others,
                pregnant: payload.pregnant
            }
            try {
                await USERS.findByIdAndUpdate(
                    userUid,
                    { $push: { "hdf_data": hdfData }},
                    { new: true}
                )
                hdfUid = newID
            } catch (error) {
                return res.sendStatus(500)
            }
        }
    
    const qrData = req.body.qrCode
    if(qrData === null) return res.status(400).json({ errors:{ message:'provide the qr code data' }})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const ifExist = await hdfIfExist(userUid, hdfUid)
    if(!ifExist) return res.status(404).json({ errors:{ message:'user hdf info not found' }})

    const ifExpired = await hdfIfExpired(userUid, hdfUid)
    if(ifExpired) return res.status(400).json({ errors:{ message:'hdf already used' }})

    let decrypted, school, gate, code = null

    try{
        decrypted = decryptJSON(qrData)
        if(decrypted.hasOwnProperty('raw_code')) school = decrypted.school, gate = decrypted.gate, code = decrypted.raw_code
        let check = await SCHOOL.findOne({ raw_code: code})
        if(!check) return res.status(404).json({ errors:{ message:'qr code information not found' }})
    } catch (error) {
        return res.status(400).json({ errors:{ message:'no signature found or invalid qr code' }})
    }

    let dateNow = moment().tz('Asia/Manila').toDate()
    const uid = user._id
    
    try {
        const newHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $set: {
                    "hdf_data.$[element].entry_date": dateNow,
                    "hdf_data.$[element].entry_campus": school,
                    "hdf_data.$[element].gate_info": gate,
                    "hdf_data.$[element].destination": destination,
                    "hdf_data.$[element].is_expired": true
                }
            },
            {
                arrayFilters: [
                    {
                        "element._id": mongoose.Types.ObjectId(hdfUid)
                    }
                ]  
            }
        )
        if(newHdfData) return res.status(201).json({ success: { message:'user hdf details updated' }})
        return res.status(400).json({ errors:{ message:'user hdf details failed to update' }}) 
    } catch (error) {
        return res.sendStatus(500)
    } 
})

module.exports = router