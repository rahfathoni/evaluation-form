import { NextFunction, Request, Response } from 'express'
import { Evaluations, EvaluationPoints, Questions } from '../models'
import { FindOptions } from 'sequelize'
import type { IEvaluation, IEvaluationResponse, IEvaluationPoint } from '../types/evaluationType'

export default class EvaluationController {
  static async getEvaluationAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const options: FindOptions = {
      order: [['id', 'ASC']],
      include: [
        {
          model: EvaluationPoints,
          attributes: ['point'],
          include: [
            {
              model: Questions,
              attributes: ['id', 'question'],
            },
            
          ],
        }
      ]
    }

    try {
      const data: IEvaluationResponse[] = await Evaluations.findAll(options)
      if (!data || data.length === 0) {
        return next({
          name: 'NotFound',
          errors: [{
            message: `No evaluations found`
          }]
        })
      }

      const dataJSON = JSON.parse(JSON.stringify(data))
      const mappedData: IEvaluation[] = dataJSON.map((item: IEvaluationResponse) => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        department: item.department,
        years: item.years,
        overall_score: item.overall_score,
        comparation: item.comparation,
        comment: item.comment,
        answers: item.EvaluationPoints.map((ans: IEvaluationPoint) => ({
          questionID: ans.Question.id,
          question: ans.Question.question,
          point: ans.point,
        })),
        createdAt: item.createdAt,
      }))

      res.status(200).json({
        status: 'success',
        result: mappedData,
      });
    } catch (err: unknown) {
      console.error(err);
      next(err);
    }
  }
}