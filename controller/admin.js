// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// MODEL IMPORT
const ADMIN = require('../models/admin')
const USERS = require('../models/users')
const TOKEN = require('../models/token')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const { objectIDValidator } = require('../utils/validator')
const { adminAccessToken, adminRefreshToken } = require('../middleware/jwt-helper')

// LOGIN AN ADMIN.
router.post("/admin/login", async (req, res) => {
    const { username, password } = req.body
    
    const admin = await ADMIN.findOne({ username })
    if(!admin) return res.status(404).json({ errors: { message:'user not found' }})
    if(admin.isDeactivated) return res.status(401).json({ errors: { message:'account is disabled' }})

    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'invalid login credentials'}})
    
    try {
        const payload = {
            id: admin._id,
        }
        const accessToken = await adminAccessToken(payload)
        const refreshToken = await adminRefreshToken(payload)

        const saveToken = new TOKEN ({
            token: refreshToken
        })
        await saveToken.save()
        if (process.env.NODE_ENV === "PRODUCTION"){
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 86000 * 1000), secure: true })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 86000 * 1000) , httpOnly: true, secure: true})
            .send('Cookies registered')
        } else {
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 86000 * 1000) })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 86000 * 1000) })
            .send('Cookies registered')
        }
    } catch (error) {
        return res.status(200).json({ errors: { message:'error occurred'}})
    }
})


// REGISTER AN ADMIN.
router.post("/admin/register", async (req, res) => {
    const { username, password, role } = req.body
    
    let hashedPassword = await bcrypt.hash(password, 12)
    const newAdmin = new ADMIN({
        username,
        password: hashedPassword,
        role
    })

    try {
        await newAdmin.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'user registered' }})
        })
    } catch (error) {
        switch(error.code) {
            case 11000: 
                return res.status(400).json({ errors:{ message:'username already taken'}})
            default:  
                return res.sendStatus(500)
        }
    }
})

// CHANGES PASSWORD FOR A USER
router.post("/user-change-password/:userUid", async (req, res) => {
    const userUid = req.params.userUid
    const idCheck = objectIDValidator(userUid)
    if (!idCheck) return res.status(400).json({ errors: { message:'invalid user ID' }})

    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const user = await USERS.findById(userUid).select('-password -__v -createdAt -updatedAt')
        if(!user) return res.status(404).json({ errors:{ message:'user not found' }})
        const updatedUser = await USERS.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true }
        )
        if(updatedUser) return res.status(200).json({ password })
        return res.status(400).json({ errors:{ message:'change password error!' }})
    } catch (error) {
        return res.sendStatus(500)
    }
})

module.exports = router