
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
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
