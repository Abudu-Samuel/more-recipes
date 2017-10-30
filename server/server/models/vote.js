'use strict';
module.exports = (sequelize, DataTypes) => {
  var vote = sequelize.define('vote', {
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return vote;
};