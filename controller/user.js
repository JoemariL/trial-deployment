// LIBRARY IMPORT
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// MODEL IMPORT
const USERS = require('../models/users')
const TOKEN = require('../models/token')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})
const auth = require('../middleware/auth')
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/jwt-helper')
const { emailValidator } = require('../utils/validator')

// LOGIN USER.
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body

    const user = await USERS.findOne({ email_address: email })
    if(!user) return res.status(404).json({ errors: { message:'The email or password you entered is not connected to an account.' }})
    if(user.user_type === "VISITOR") return res.status(400).json({ errors: { message:'The email or password you entered is invalid.' }}) 

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ errors: { message:'The email or password you entered is invalid.' }})

    try {
        const payload = {
            id: user._id,
        }
        const accessToken = await generateAccessToken(payload)
        const refreshToken = await generateRefreshToken(payload)

        const saveToken = new TOKEN ({
            token: refreshToken
        })
        await saveToken.save()

        if (process.env.NODE_ENV === "PRODUCTION"){
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000), secure: true })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 518400 * 1000) , httpOnly: true, secure: true})
            .send('Cookies registered')
        } else {
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000) })
            .cookie("refreshToken", refreshToken, { expires: new Date(new Date().getTime() + 518400 * 1000) })
            .send('Cookies registered')
        }
        
    } catch (error) {
        return res.status(400).json({ errors: { message:'error occurred' }})
    }
})

// REGISTER A USER.
router.post("/user/register", async (req, res) => {
    const { firstName, lastName, password, age, contactNumber, homeAddress, email, userType, department } = req.body
    let email_address = email.replace(/\s+/g, '')
    const emailCheck = emailValidator(email)
    if(emailCheck) return res.status(400).json({ errors:{ message:'email input must be a valid email address' }})

    let hashedPassword = await bcrypt.hash(password, 12)

    try {
        let newUser = new USERS({
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            age,
            contact_number: contactNumber,
            home_address: homeAddress,
            email_address,
            department,
            user_type: userType
        })

        await newUser.save()
        .then(() => {
            return res.status(201).json({ success:{ message:'user registered' }})
        })
    } catch (error) {
        switch(error.code) {
            case 11000: 
                return res.status(400).json({ errors:{ message:'email already taken'}})
            default:  
                return res.sendStatus(500)
        }
    }
})

router.post('/token', async (req, res) => {
    try {
        if(req.cookies.refreshToken === null || req.cookies.refreshToken === undefined) return res.sendStatus(204)
        
        const token = req.cookies.refreshToken
        
        // checks if the refresh token exists in the database
        const refreshToken = await TOKEN.find({ token })
        if(refreshToken.length === 0) {
            res.clearCookie('refreshToken').clearCookie('accessToken')
            return res.sendStatus(401)
        }

        const tokenInfo = await verifyRefreshToken(refreshToken[0].token, token)
        if(!tokenInfo) return res.sendStatus(403)
        const accessToken = await generateAccessToken(tokenInfo)

        if (process.env.NODE_ENV === "PRODUCTION") {
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000), secure: true })
            .send('Access token generated')
        } else {
            return res.status(200)
            .cookie("accessToken", accessToken, { expires: new Date(new Date().getTime() + 518400 * 1000) })
            .send('Access token generated')
        }
    } catch (error) {
        return res.sendStatus(404)
    }
})

router.delete('/logout', async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (token == null) {
            res.clearCookie('accessToken')
            return res.sendStatus(204)
        } else { 
            return await TOKEN.deleteOne({ token }).then(() => {
                res.clearCookie('refreshToken').clearCookie('accessToken')
                return res.sendStatus(204)
            })
        }
    } catch (error) {
        return res.sendStatus(400)
    }
})

module.exports = router;