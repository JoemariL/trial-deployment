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

module.exports.countDepartments = (data) => {
    return data.map((payload) => {
        let departmentList = {}
        const dept = payload.users.map((data) => {
            return data.department
        })

        for (var i = 0; i < dept.length; i++) {
            if (typeof departmentList[dept[i]] == "undefined") {
                departmentList[dept[i]] = 1;
            } else {
                departmentList[dept[i]]++;
            }
        }

        return {
            ...payload,
            department_list: departmentList
        }
    })
}

module.exports.generateRandomKey = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}