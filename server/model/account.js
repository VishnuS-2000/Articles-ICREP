const {DataTypes,Model}=require('sequelize')
const sequelize=require('../config/database')


class Account extends Model {}

Account.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    displayName:{
        type:DataTypes.STRING,
        unique:true
    },
    photo:{
        type:DataTypes.STRING
    }
    ,
    note:{
        type:DataTypes.STRING
    },
    bio:{
        type:DataTypes.STRING,
    },
    salt:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hash:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.STRING


    },
    permissions:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull:false
    }
},{sequelize,modelName:'account'})

const syncModel=async()=>{
    
    try{

    await Account.sync()
}
catch(err){
    console.log(err)
}

}

syncModel() 

module.exports=Account;