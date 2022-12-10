require('dotenv').config()
const express=require('express')
const app=express()

const port=process.env.PORT||4000

const cors=require('cors')
const cookieParser=require('cookie-parser')

const corsOptions = require('./config/cors')
const credentials=require('./middleware/credentials')

const {AuthRouter}=require('./routes/auth')
const {AuthorRouter}=require('./routes/author')
const {ArticlesRouter}=require('./routes/articles')
const path=require('path')



app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'50mb'}))
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser())

app.use(`${process.env.BASE_PATH}/auth`,AuthRouter)
app.use(`${process.env.BASE_PATH}/author`,AuthorRouter)
app.use(`${process.env.BASE_PATH}/article`,ArticlesRouter)


app.get('/',(req,res)=>{


    try{
        
        res.status(200).json({message:'Welcome to ICREP CUSAT JIS v1.0'})

    }catch(err){
        console.log(err)
        res.status(500).json({message:'Error sending email'})
    }
})


app.listen(port,()=>console.log('Server listening on port 4000'))





