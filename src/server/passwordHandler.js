import crypto from 'crypto';

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {

    if (password == null || password == "") {
        return null;
    }

    let hash = crypto.createHmac('sha512', salt);
    return hash.update(password).digest('base64');
}

function validatePassword(password, salt, hash) {
    return generateHash(password, salt) === hash;
}

function generateToken() {
    return crypto.randomBytes(64).toString('base64');
}

export { generateSalt, generateHash, validatePassword, generateToken }