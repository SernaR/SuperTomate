const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = 'BOQBAnSkVR1kSepgCJjMbD_x2gsWubDWfu0cR88zjS3PD029rS8z2ZuliX16R6azjAURbTuBv3exTRVWFEmxaPJAOjvO6FAW_xn_Q45Pwn'

exports.generateToken = userdata => {
    return jwt.sign({
        userId: userdata.id,
        isAdmin: userdata.isAdmin
    },
    JWT_SIGN_SECRET,
    {
        expiresIn: '5h'
    })
}

exports.parseAuthorization = authorization => {
    return authorization ? authorization.replace('Bearer ', '') : null
}

exports.getUserId = authorization => {
    let userId = -1
    const token = module.exports.parseAuthorization(authorization)
    if(token) {
        try {
           const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
           if(jwtToken) {
               userId = jwtToken.userId
           }
        } catch (err) {
            console.log(err)
        }
        return userId
    }
}

exports.checkAdmin = authorization => {
    let isAdmin = false
    const token = module.exports.parseAuthorization(authorization)
    if(token) {
        try {
           const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
           if(jwtToken) {
            isAdmin = jwtToken.isAdmin
           }
        } catch (err) {
            console.log(err)
        }
        return isAdmin
    }
}