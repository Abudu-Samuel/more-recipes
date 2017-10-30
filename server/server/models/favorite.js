
module.exports = (sequelize) => {
  const favorite = sequelize.define('favorite', {});
  favorite.associate = (models) => {
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
