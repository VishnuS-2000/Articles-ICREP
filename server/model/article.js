const {DataTypes,Model} =require('sequelize')
const sequelize=require('../config/database')

const Author=require('./author')

class Article extends Model{}

Article.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    topic:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT
    },
    richText:{
        type:DataTypes.TEXT
    },
    image:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    }
    
},{
    sequelize,
    modelName:'article'
})

const Grant = sequelize.define('grant', {
  }, { timestamps: false });




Article.belongsToMany(Author,{through:Grant})
Author.belongsToMany(Article,{through:Grant})


const syncModel=async()=>{
try{
    await Article.sync()
    await Grant.sync()
}
catch(err){
console.log(err)
}

}

syncModel()

module.exports=Article
module.exports.Grant=Grant