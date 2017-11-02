'use strict';

module.exports = function (sequelize, DataTypes) {
  var vote = sequelize.define('vote', {
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
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  vote.associate = function (models) {
    vote.belongsTo(models.recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    vote.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return vote;
};