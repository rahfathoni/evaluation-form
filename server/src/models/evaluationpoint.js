'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EvaluationPoint extends Model {
    static associate(models) {
      this.belongsTo(models.Evaluation, { foreignKey: 'evaluationId' });
      this.belongsTo(models.Questions, { foreignKey: 'questionId' });
    }
  }

  EvaluationPoint.init({
    evaluationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    }
  }, {
    sequelize,
    modelName: 'EvaluationPoint',
  });

  return EvaluationPoint;
};