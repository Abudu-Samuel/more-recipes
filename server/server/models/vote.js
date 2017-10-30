

module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    upvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  return vote;
};
