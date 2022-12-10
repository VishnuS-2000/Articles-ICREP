const allowedOrgins=require('./origins')


const corsOptions = {

    origin:(origin,callback)=>{
        if(allowedOrgins.indexOf(origin)!==-1 || !origin){

            callback(null,true)
        }

        else{
            callback('Not allowed by CORS')
        }
    },

    
    optionsSucessStatus:200
}
module.exports=corsOptions