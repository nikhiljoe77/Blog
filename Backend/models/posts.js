const  Sequelize =require('sequelize') ;
const  sequelize  =require('../db.js') ;
const Post=sequelize.define('Post',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    desc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    cat:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    timestamps:false
}
   ) 
   module.exports=Post