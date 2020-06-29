// user model declaration
'use strict';
const bcyrpt = require('bycrypt');
// declare use model format
module.exprots = function(sequelize, DataTypes){
  // define user object
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 cahracters'
        }
      }
    },
     password: {
       type: DataTypes.STRING,
       validate: {
         len: {
           args: [8, 99],
           msg: 'Password is of incorrect length. Double check character number'
         }
       }
     }
  }, {
    hooks: { 
      // before record creation
      beforeCreate: function(createdUser, options) {
        if(createdUser && createdUser.password){
          let hash = bcyrpt.hashSync(createdUser.password, 12) // 12 rounds of hash (destructive hash)
          createdUser.password = hash;
        }
      }    
    } 
  });

  user.associate = function(models) {
    //TODO: add use associations
  }

  //valid password
  user.prototype.validPassword = function(passwordTyped){
    return bcyrpt.compareSync(passwordTyped, this.password);
  }

  //remove password before any serialization of User Object
  user.prototype.toJSON= function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
};

// hash new password to add to table
// remove password setup before add
// return user model