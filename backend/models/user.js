module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", { 
      id: { 
        type: Sequelize.INTEGER,    
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: { 
        type:Sequelize.STRING
      }, 
      refreshToken:{ 
        type:Sequelize.STRING
      }
    });
  
    return User;
  };