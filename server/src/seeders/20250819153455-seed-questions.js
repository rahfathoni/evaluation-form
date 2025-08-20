'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      {
        question: 'Management is capable and competent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management clearly explains strategies and goals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management positively motivates employees to achieve goals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management has realistic performance expectations',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management takes responsibility for their actions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management treats employees with respect',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management is accessible for questions and advice',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management follows company rules and policies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Management takes a personal interest in my success',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'I feel comfortable speaking with management',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
