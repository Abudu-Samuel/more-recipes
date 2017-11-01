
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
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
  review.associate = (models) => {
    review.belongsTo(models.recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    review.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return review;
};
