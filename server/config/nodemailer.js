require('dotenv').config()
const nodemailer=require('nodemailer')
const {google}=require('googleapis')
const{oauth2client}=require("./oauth2")


const sendMail=async (options)=>{
    // console.log('hello',options)
    try{
    const accessToken = await oauth2client.getAccessToken()
   

    const transport=nodemailer.createTransport({
        service:'gmail',
        auth :{
        type:'OAuth2',
        user:process.env.EMAIL,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET_KEY,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        accessToken:accessToken
        }
    })
    
    const mailOptions={
        from:`ICREP JIS <${process.env.EMAIL}>`,
        to:options.to,
        subject:options.subject,
        text:options.text,
        html:options.html,
    }

    const result=transport.sendMail(mailOptions)

    return result
}
catch(err){
    return err
}


}

module.exports={sendMail}