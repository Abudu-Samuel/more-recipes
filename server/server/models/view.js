
module.exports = (sequelize, DataTypes) => {
  const view = sequelize.define('view', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  view.associate = (models) => {
    view.belongsTo(models.recipe, {
      foreignKey: 'recipeId'
    });
  };
  return view;
};
