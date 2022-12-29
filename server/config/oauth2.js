const {google}=require('googleapis')

const oauth2client=new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET_KEY,process.env.GOOGLE_CLIENT,process.env.GOOGLE_REDIRECT_URI)

oauth2client.setCredentials({refresh_token:process.env.GOOGLE_REFRESH_TOKEN})


module.exports={
    oauth2client
}

