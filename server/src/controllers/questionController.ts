import { NextFunction, Request, Response } from 'express'
import { Questions } from '../models'
import { FindOptions } from 'sequelize'
import type { IQuestion } from '../types/questionTypes'

export default class QuestionController {
  static async getQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    const options: FindOptions = {
      order: [['id', 'ASC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }

    try {
      const data: IQuestion[] = await Questions.findAll(options);

      res.status(200).json({
        status: 'success',
        result: data,
      });
    } catch (err: unknown) {
      next(err);
    }
  }
}