const {DataTypes,Model, DATE}=require('sequelize')
const sequelize=require('../config/database')

const Announcement=require('./announcement')
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


Announcement.hasMany(Contribution,{onDelete:'cascade'})
Contribution.belongsTo(Announcement);

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