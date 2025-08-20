'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EvaluationPoints extends Model {
    static associate(models) {
      this.belongsTo(models.Evaluations, { foreignKey: 'evaluationId' });
      this.belongsTo(models.Questions, { foreignKey: 'questionId' });
    }
  }

  EvaluationPoints.init({
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
    modelName: 'EvaluationPoints',
  });

  return EvaluationPoints;
};