const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}


const compareHashedPassword = (rawPassword, hashedPassword) => {
    return bcrypt.compareSync(rawPassword, hashPassword)
}

module.exports = {
    hashPassword,
    compareHashedPassword
};