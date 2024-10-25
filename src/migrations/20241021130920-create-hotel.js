'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotels', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      lon: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      raiting: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities', // ejemplo: hotels
          key: 'id', // atributo en la tabla al que hacemos referencia
        },
        onUpdate: 'CASCADE',// si el valor de la columna referenciada cambia, el valor de cityId también cambiará.
        onDelete: 'SET NULL', //si se elimina un registro en la tabla hotels que está siendo referenciado, el valor de la columna cityId se establecerá en NULL en lugar de eliminar el registro. 
        //'CASCADE', // Elimina el registro si se elimina el valor referenciado
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hotels');
  }
};