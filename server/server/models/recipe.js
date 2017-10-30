

module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  recipe.associate = (models) => {
    recipe.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return recipe;
};
