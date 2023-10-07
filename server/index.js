require('dotenv').config()
const express=require('express')
const app=express()

const port=process.env.PORT||4000

const cors=require('cors')
const morgan=require('morgan');
const cookieParser=require('cookie-parser')

const corsOptions = require('./config/cors')
const credentials=require('./middleware/credentials')

const {AuthRouter}=require('./routes/auth')
const {AuthorRouter}=require('./routes/author')
const {PublicationRouter}=require('./routes/publication')
const {AccountsRouter}=require('./routes/account')
const {GeneralRouter}=require('./routes/general')
const {AnnouncementRouter}=require('./routes/announcement')
const {ContributionRouter}=require('./routes/contribution')



app.use(morgan('tiny'));
app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json({limit:'100mb'}))
app.use(express.urlencoded({limit:'100mb',extended:true,parameterLimit:100000}))

app.use(express.static('public'));


app.use(cookieParser())

app.use(`${process.env.BASE_PATH}/auth`,AuthRouter)
app.use(`${process.env.BASE_PATH}/author`,AuthorRouter)
app.use(`${process.env.BASE_PATH}/publication`,PublicationRouter)
app.use(`${process.env.BASE_PATH}/account`,AccountsRouter)
app.use(`${process.env.BASE_PATH}/app`,GeneralRouter)
app.use(`${process.env.BASE_PATH}/announcement`,AnnouncementRouter)
app.use(`${process.env.BASE_PATH}/contribution`,ContributionRouter)


app.get('/',(req,res)=>{

    try{
        
        res.status(200).json({message:'Welcome to ICREP CUSAT JIS v1.0'})

    }catch(err){
        console.log(err)
        res.status(500).json({message:'Error sending email'})
    }
})




app.listen(port,()=>console.log('Server listening on port 4000'))





