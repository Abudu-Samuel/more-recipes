

module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
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
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  recipe.associate = (models) => {
    recipe.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    recipe.hasMany(models.review, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    recipe.hasMany(models.vote, {
      foreignKey: 'recipeId',
      as: 'votes'
    });
    recipe.hasMany(models.view, {
      foreignKey: 'recipeId',
      as: 'votes'
    });
    recipe.hasMany(models.favorite, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });
  };
  return recipe;
};
