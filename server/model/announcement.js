const {DataTypes,Model}=require('sequelize')
const sequelize=require('../config/database')

class Announcement extends Model {}

Announcement.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    dated:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,

    },
    acceptContributions:{
    
        type:DataTypes.BOOLEAN,
        allowNull:false,
        
    },  
    file:{
        type:DataTypes.STRING,
    },
    folderId:{
        type:DataTypes.STRING
    }
    ,
    status:{
        type:DataTypes.STRING,
        defaultValue:'active'
        
    }
},{
    modelName:'announcement',
    sequelize
})


const syncModel=async()=>{
    try{
        await Announcement.sync()
    
    }
    catch(err){
    console.log(err)
    }
    
    }

syncModel()

module.exports=Announcement