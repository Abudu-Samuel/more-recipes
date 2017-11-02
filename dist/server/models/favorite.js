'use strict';

module.exports = function (sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'recipes',
        key: 'id',
        as: 'recipeId'
      }
    }
  });
  favorite.associate = function (models) {
    favorite.belongsTo(models.recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    favorite.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return favorite;
};