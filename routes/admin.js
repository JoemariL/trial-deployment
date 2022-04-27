// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

// MODEL IMPORT
const ADMIN = require('../models/admin')
const USERS = require('../models/users')
const SCHOOL = require('../models/school')
const STATISTICS = require('../models/statistics')

// UTILS IMPORT
const { objectIDValidator } = require('../utils/validator')
const { encryptJSON } = require('../utils/functions')
const { extractID } = require('../middleware/jwt-helper')
const { getAllUsers } = require('../utils/pipelines')

// GET ALL ADMIN INFO.
router.get("/get-all-admin", async (req, res) => {
    try {
        const adminData = await ADMIN.find().select('-password -__v')
        if(!adminData) return res.status(404).json({ errors:{ message: 'no data found' }})
        return res.status(200).json(adminData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET ALL USERS
router.get("/get-all-users", async (req, res) => {
    try {
        const userData = await getAllUsers();
        if(!userData) return res.status(404).json({ errors:{ message: 'no data found'}})
        return res.status(200).json(userData)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

// GET SPECIFIC ADMIN.
router.get("/get", async (req, res) => {
    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const adminUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(adminUid).select('-password -__v -createdAt -updatedAt')
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id' }})

    try {
        const admin = await ADMIN.findById(adminUid)
        if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})
        return res.status(200).json(admin)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// CHANGE PASSWORD FOR ADMIN.
router.patch("/update/password", async(req, res) => {

    if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) { 
        res.clearCookie('accessToken')
        return res.sendStatus(401)
    }

    const adminUid = await extractID(req.cookies.accessToken)
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid admin id '}})

    const { oldPassword, newPassword, confirmNewPassword } = req.body

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})

    const isMatch = await bcrypt.compare(oldPassword, admin.password)
    if(!isMatch) return res.status(400).json({ errors:{ message:'password not match' }})

    const samePassword = await bcrypt.compare(newPassword, admin.password)
    if(samePassword) return res.status(400).json({ errors:{ message:'new password can\'t be the same password' }})

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const password = await bcrypt.compare(confirmNewPassword, hashedPassword)
    if(!password) return res.status(400).json({ errors:{ message:'password and confirm password not match' }})

    try {
        const updatedAdmin = await ADMIN.findOneAndUpdate({ _id: admin._id }, { password: hashedPassword }, { new: true })
        if(updatedAdmin) return res.status(200).json({ success:{ message:'change password success!'}})
        return res.status(400).json({ errors:{ message:'change password error!'}})
    } catch (error) {
        return res.sendStatus(500)   
    }
})

// DELETES ADMIN.
router.delete("/delete/:adminID", async(req, res) => {
    const adminUid = req.params.adminID
    const idCheck = objectIDValidator(adminUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid admin id' }})

    const admin = await ADMIN.findById(adminUid)
    if(!admin) return res.status(404).json({ errors:{ message:'admin not found' }})

    try {
        const deleteAdmin = await ADMIN.deleteOne({ _id: admin._id })
        if(deleteAdmin) return res.status(200).json({ success:{ message:'admin deleted' }})
        return res.status(200).json({ errors:{ message:'admin deletion error'}})
    } catch (error) {
        return res.sendStatus(500)
    }

})

// DELETES USER.
router.delete("/deleteUser/:userID", async (req, res) => {
    const userUid = req.params.userID
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors:{ message:'invalid user ID' }})

    const user = await USERS.findById(userUid)
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    try {
        const deleteUser = await USERS.deleteOne({ _id: user._id })
        if(deleteUser) return res.status(200).json({ success:{ message:'user deleted' }})
        return res.status(400).json({ errors:{ message:'user deletion error' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET LIST OF QR CODES.
router.get("/get/qr", async (req, res) => {
    try {
        const qrData = await SCHOOL.find()
        if(!qrData) return res.status(404).json({ errors:{ message: 'no data found' }})
        return res.status(200).json(qrData)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// ADD LIST FOR QR CODE GENERATION.
router.post("/generateQr", async (req, res) => {
    const { school, gate } = req.body

    let concat = `${school} ${gate}`
    let matches = concat.match(/\b(\w)/g)
    let qrData = matches.join('')

    let payload = {school, gate, raw_code: qrData}
    let encrypt = encryptJSON(payload)

    const check = await SCHOOL.find({ raw_code: qrData })
    if(check.length !== 0) return res.status(400).json({ errors: { message:'gate details already exist' }})

    try {
        const newData = new SCHOOL({
            school,
            gate,
            raw_code: qrData,
            generated_code: encrypt
        })
        await newData.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'school details updated' }})
        })
        .catch(() => {
            return res.status(400).json({ errors:{ message:'school details failed to update' }})
        })
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETES THE QR CODE GENERATED
router.delete("/removeQr/:qrID", async (req, res) => {
    const qrUid = req.params.qrID
    const idCheck = objectIDValidator(qrUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid qr id' }})

    const qr = await SCHOOL.findById(qrUid)
    if(!qr) return res.status(404).json({ errors:{ message:'qr info not found' }})

    try {
        const deleteQR = await SCHOOL.deleteOne({ _id: qr._id })
        if(deleteQR) return res.status(200).json({ success:{ message:'qr info deleted' }})
        return res.status(400).json({ errors:{ message:'qr info deletion error' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

// GET A FULL USER PROFILE.
router.get("/get-user/:userUid", async (req, res) => {
    const userUid = req.params.userUid
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})
    
    try {
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
        return res.status(200).json(user)
    } catch (error) {
        return res.sendStatus(500)
    }
})

router.get("/daily-reports", async (req, res) => {
    try {
        const stats = await STATISTICS.find()
        if(!stats) return res.status(404).json({ errors: { message: 'empty' }})
        return res.status(200).json(stats)
    } catch (error) {
        return res.sendStatus(500)
    }
})

// DELETE A HDF ON A USER
router.delete("/hdf/:userUid/:hdfID", async (req, res) => {
    const userUid = req.params.userUid
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const hdfUid = req.params.hdfID
    const hdfCheck = objectIDValidator(hdfUid)
    if (!hdfCheck) return res.status(400).json({ errors:{ message:'invalid hdf ID'}})

    const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
    if(!user) return res.status(404).json({ errors:{ message:'user not found' }})

    const uid = user._id
    try {
        const removedHdfData = await USERS.findByIdAndUpdate(
            uid,
            {
                $pull : {
                    hdf_data: { _id: mongoose.Types.ObjectId(hdfUid) }
                }
            }
        )

        if(removedHdfData) return res.status(201).json({ success: { message:'user hdf detail deleted' }})
        return res.status(400).json({ errors:{ message:'user hdf detail failed to delete' }}) 
    } catch (error) {
        return res.sendStatus(500)
    }
})

router.get("/hdf/statistics", async (req, res) => {
    try {
        const stats = await STATISTICS.find()
        return res.status(200).json(stats)
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router