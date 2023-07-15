const{oauth2client}=require('./oauth2');
const {google}=require('googleapis')


const sheets=google.sheets({
    version:'v4',
    auth:oauth2client

})

module.exports={sheets};