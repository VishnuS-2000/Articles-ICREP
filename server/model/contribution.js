const {DataTypes,Model, DATE}=require('sequelize')
const sequelize=require('../config/database')

class Contribution extends Model{}

Contribution.init({

    id:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bio:{
        type: DataTypes.STRING,
        allowNull:false
    },
    file:{
        type:DataTypes.STRING,
        allowNull:false
    }



},{modelName:'contribution',sequelize})



const syncModel=async()=>{

    try{
        await Contribution.sync()
    }
    catch(err){
        console.log(err)
    }


}


syncModel()

module.exports=Contribution