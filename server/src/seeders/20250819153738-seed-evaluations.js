'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Evaluations', [
      {
        first_name: 'Budi',
        last_name: 'Dor',
        department: 'Engineering',
        years: 8,
        overall_score: 8,
        comparation: 'Much Better',
        comment: 'Supervisor consistently delivers high-quality work and collaborates well.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Siti',
        last_name: 'Mul',
        department: 'Marketing',
        years: 2,
        overall_score: 3,
        comparation: 'Worse',
        comment: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluations', null, {});
  }
};
