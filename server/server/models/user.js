
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email already Exist'
        }
      }
    },
  });
  user.associate = (models) => {
    user.hasMany(models.recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    });
    user.hasMany(models.review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
    user.hasMany(models.vote, {
      foreignKey: 'userId',
      as: 'votes'
    });
    user.hasMany(models.view, {
      foreignKey: 'userId',
      as: 'view'
    });
    user.hasMany(models.favorite, {
      foreignKey: 'userId',
      as: 'favorites'
    });
  };
  return user;
};
