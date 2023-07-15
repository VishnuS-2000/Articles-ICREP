const {DataTypes,Model} =require('sequelize')
const sequelize=require('../config/database')

class Issue extends Model{}

Issue.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    year:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    volume:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    issue:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    period:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isArchived:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }

},{
    sequelize,
    modelName:'issue'
})



const syncModel=async()=>{
    try{
        await Issue.sync()
    }
    catch(err){
        console.log(err)
    }
}

syncModel()

module.exports=Issue;