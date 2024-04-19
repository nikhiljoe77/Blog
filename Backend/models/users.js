const  Sequelize =require('sequelize') ;
const  sequelize  =require('../db.js') ;
//this is from sequelize not the standrd that we use 
// const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true

},
  name: {
    type:Sequelize.STRING,
allowNull:false,
unique:true

},
  email: {
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
},
password: {
    type:Sequelize.STRING,
    allowNull:false
},
img: {
    type:Sequelize.STRING,
    defaultValue: 'default_image.jpg'
    // allowNull:false
},

},{
timestamps:false
}

);
module.exports=User