const {oauth2client}=require('./oauth2')
const {google}=require('googleapis')

const docs=google.docs(
    {
        version:'v1',
        auth:oauth2client
    }
    )
    
module.exports ={
        docs
    }
    
    