const  Sequelize  =require("sequelize") 
 const sequelize = new Sequelize('blog', 'root', 'SQLSQL', {
    host: 'localhost',
    dialect:'mysql' 
  });
  async function checkconnection(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  checkconnection()
  
  module.exports=sequelize