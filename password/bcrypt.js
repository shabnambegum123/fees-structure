
const bcrypt = require('bcrypt')

const generatePassword = async(password)=> {
    const Password = await  bcrypt.hashSync(password,10)
    return Password
}
module.exports = {generatePassword}
