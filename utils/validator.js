// LIBRARY IMPORTS
const ObjectId = require("mongoose").Types.ObjectId;

// CHECKS THE INPUT IF ID IS VALID.
module.exports.objectIDValidator = (id) => {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) return true;
        return false;
    }
}

// CHECKS THE EMAIL FORMAT
module.exports.emailValidator = (email) => {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) return true
    return false
}
