const {oauth2client}=require("./oauth2")
const {google}=require('googleapis')


const drive=google.drive(
{
    version:'v3',
    auth:oauth2client
}
)

module.exports ={
    drive
}


