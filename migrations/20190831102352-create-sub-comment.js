'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SubComments', {
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
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isChecked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isBlocked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubComments');
  }
};