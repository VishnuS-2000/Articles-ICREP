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
Author.hasMany(Article,{
    foreignKey:'authorId',
    onDelete:'CASCADE'
})
Article.belongsTo(Author)

const syncModel=async()=>{
try{
    await Article.sync()
}
catch(err){
console.log(err)
}

}

syncModel()

module.exports=Article