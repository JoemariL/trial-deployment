// LIBRARY IMPORTS
const jwt = require('jsonwebtoken')

// UTILS IMPORT
require('dotenv').config({ path: '../.env'})

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ADMIN_ACCESS_KEY, (err, admin) => {
        if (err) return res.sendStatus(403)
        next()
    })
}