'use strict';

module.exports = function (sequelize, DataTypes) {
  var view = sequelize.define('view', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  view.associate = function (models) {
    view.belongsTo(models.recipe, {
      foreignKey: 'recipeId'
    });
  };
  return view;
};