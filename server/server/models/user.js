
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
        isEmail: true,
        notEmpty: {
          msg: 'email cannot'
        }
      }
    }
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
    user.hasMany(models.favorite, {
      foreignKey: 'userId',
      as: 'favorites'
    });
  };
  return user;
};
