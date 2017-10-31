
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageurl: {
      type: Sequelize.STRING,
      allowNull: false

    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    directions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'user',
        key: 'id',
        as: 'userId'
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('recipes')
};
