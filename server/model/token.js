const {DataTypes,Model, UUIDV4} =require('sequelize')
const sequelize=require('../config/database')


class Token extends Model{}

Token.init({
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    purpose:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jwt:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'pending',
        allowNull:false
    }


},{
    sequelize,
    modelName:'token'
})

const syncModel=async()=>{
    try{
        await Token.sync()
    }
    catch(err){
        console.log(err)
    }
}

syncModel()

module.exports=Token;
