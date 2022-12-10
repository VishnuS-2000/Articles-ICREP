require('dotenv').config()
const crypto=require('crypto')
const jwt=require('jsonwebtoken')


const generatePassword=(password)=>{
    var salt=crypto.randomBytes(64).toString('hex')
    const hash=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return {salt,hash}
}

const verifyPassword=(password,hash,salt)=>{
    const hashedPassword=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return hashedPassword===hash
}

const issueJWT=(username)=>{
    const accessToken=jwt.sign({username},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'2hr'
        })

    const refreshToken=jwt.sign({username},
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:'1d'
        })
    return {accessToken,refreshToken}


}


const generateOTP=()=>{
    const max=1000000
    const min=100000
    return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports.generatePassword=generatePassword;
module.exports.verifyPassword=verifyPassword;
module.exports.issueJWT=issueJWT;
module.exports.generateOTP=generateOTP;