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
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    issue:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    volume:{
        type:DataTypes.STRING,
        allowNull:false
    },
    keywords:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    },
    footnotes:{
        type:DataTypes.ARRAY(DataTypes.JSON)     
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