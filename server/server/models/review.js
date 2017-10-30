'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return review;
};