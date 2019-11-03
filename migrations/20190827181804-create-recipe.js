'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      difficultyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Difficulties',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      serve: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      making: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      cook: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      difficulty: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDraft: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};