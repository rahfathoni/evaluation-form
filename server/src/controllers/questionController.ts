import { NextFunction, Request, Response } from 'express'
import { Questions } from '../models'
import { FindOptions } from 'sequelize'
import type { IQuestion } from '../types/questionType'

export default class QuestionsController {
  static async getQuestionAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const options: FindOptions = {
      order: [['id', 'ASC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }

    try {
      const data: IQuestion[] = await Questions.findAll(options);
      if (!data || data.length === 0) {
        return next({
          name: 'NotFound',
          errors: [{
            message: `No questions found`
          }]
        })
      }

      res.status(200).json({
        status: 'success',
        result: data,
      });
    } catch (err: unknown) {
      next(err);
    }
  }
}