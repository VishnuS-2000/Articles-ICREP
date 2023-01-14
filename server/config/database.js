require('dotenv').config()
const Sequelize=require('sequelize')

 
// For Local uncomment this and comment below
const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:'localhost',
    dialect:'postgres',
    logging:false
})


// For cloud SQL server uncomment this and commment above

// const sequelize=new Sequelize(process.env.DATABASE_URL,{
//     dialect:'postgres',
//     dialectOptions:{
//         'ssl':{
//             require:'true',
//             "rejectUnauthorized": false

//         }
//     },
//     logging:false

// })


const checkConnection = async ()=>{

try{
    await sequelize.authenticate()
    console.log('Database connection established')
}
catch(err){
    console.log(err)
}

}

checkConnection()

module.exports=sequelize