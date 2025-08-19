'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.EvaluationPoints, { foreignKey: 'evaluationId' });
    }
  }
  Evaluations.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `First Name must be filled`
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Last Name must be filled`
        }
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Department must be filled`
        }
      }
    },
    years: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Years must be filled`
        },
        min: {
          args: 0,
          msg: `Years must be at least 0`
        },
      }
    },
    overall_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Overall Score must be filled`
        },
        min: {
          args: 0,
          msg: `Overall Score must be at least 0`
        },
        max: {
          args: 10,
          msg: `Overall Score must not exceed 10`
        }
      }
    },
    comparation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Comparation must be filled`
        },
      }
    },
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Evaluations',
  });
  return Evaluations;
};