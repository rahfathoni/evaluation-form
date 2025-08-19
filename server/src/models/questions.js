'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.EvaluationPoints, { foreignKey: 'questionId' });
    }
  }
  Questions.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Question must be unique'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Question must be filled`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};