const {oauth2client}=require('./oauth2')

const docs=google.docs(
    {
        version:'v1',
        auth:oauth2client
    }
    )
    
module.exports ={
        docs
    }
    
    