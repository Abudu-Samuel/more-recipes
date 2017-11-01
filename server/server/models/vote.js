

module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
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
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  vote.associate = (models) => {
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
