const CryptoJS = require("crypto-js")
require('dotenv').config({ path: '../.env'})
const cipher = process.env.CIPHER_KEY

module.exports.encryptText = (data) => {
    return CryptoJS.AES.encrypt(data, cipher).toString()
}

module.exports.encryptJSON = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), cipher).toString()
}

module.exports.decryptText = (data) => {
    let bytes = CryptoJS.AES.decrypt(data, cipher)
    return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports.decryptJSON = (data) => {
    let bytes  = CryptoJS.AES.decrypt(data, cipher);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}