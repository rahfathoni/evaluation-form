'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const evalId1 = [
      { evaluationId: 1, questionId: 1, point: 5 },
      { evaluationId: 1, questionId: 2, point: 4 },
      { evaluationId: 1, questionId: 3, point: 5 },
      { evaluationId: 1, questionId: 4, point: 4 },
      { evaluationId: 1, questionId: 5, point: 5 },
      { evaluationId: 1, questionId: 6, point: 4 },
      { evaluationId: 1, questionId: 7, point: 5 },
      { evaluationId: 1, questionId: 8, point: 4 },
      { evaluationId: 1, questionId: 9, point: 5 },
      { evaluationId: 1, questionId: 10, point: 4 },
    ].map(p => ({ ...p, createdAt: new Date(), updatedAt: new Date() }));

    const eavlId2 = [
      { evaluationId: 2, questionId: 1, point: 2 },
      { evaluationId: 2, questionId: 2, point: 1 },
      { evaluationId: 2, questionId: 3, point: 2 },
      { evaluationId: 2, questionId: 4, point: 1 },
      { evaluationId: 2, questionId: 5, point: 2 },
      { evaluationId: 2, questionId: 6, point: 1 },
      { evaluationId: 2, questionId: 7, point: 2 },
      { evaluationId: 2, questionId: 8, point: 1 },
      { evaluationId: 2, questionId: 9, point: 2 },
      { evaluationId: 2, questionId: 10, point: 1 },
    ].map(p => ({ ...p, createdAt: new Date(), updatedAt: new Date() }));

    await queryInterface.bulkInsert('EvaluationPoint', [...evalId1, ...eavlId2], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EvaluationPoint', null, {});
  }
};
