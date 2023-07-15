const {DataTypes,Model} =require('sequelize')
const sequelize=require('../config/database')

const Author=require('./author')
const Issue=require('./issue')
class Publication extends Model{}

Publication.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT
    },
    richText:{
        type:DataTypes.TEXT
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    keywords:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
    references:{
        type:DataTypes.TEXT
       },
       status:{
        type:DataTypes.STRING
       }
},{
    sequelize,
    modelName:'publication'
})

const Grant = sequelize.define('grant', {
  }, { timestamps: false });
  
Publication.belongsToMany(Author,{through:Grant})
Author.belongsToMany(Publication,{through:Grant})
Issue.hasMany(Publication)
Publication.belongsTo(Issue)

const syncModel=async()=>{
try{
    await Publication.sync()
    await Grant.sync()
}
catch(err){
console.log(err)
}

}

syncModel()

module.exports=Publication
module.exports.Grant=Grant