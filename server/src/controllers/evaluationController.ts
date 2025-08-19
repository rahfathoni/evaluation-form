import { NextFunction, Request, Response } from 'express'
import { Evaluations, EvaluationPoints, Questions } from '../models'
import { FindOptions } from 'sequelize'
import type { IEvaluation, IEvaluationResponse, IEvaluationPoint, IEvaluationCreate, IAnswer } from '../types/evaluationType'

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
      const mappedData: IEvaluation[] = dataJSON.map((item: IEvaluationResponse) => {
        const answers = item.EvaluationPoints.map((ans: IEvaluationPoint) => ({
          questionID: ans.Question.id,
          question: ans.Question.question,
          point: ans.point,
        }))

        const total_questions = answers.length
        const score = answers.reduce((sum, a) => sum + a.point, 0) / total_questions

        return {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          department: item.department,
          years: item.years,
          overall_score: item.overall_score,
          comparation: item.comparation,
          comment: item.comment,
          answers,
          score,
          total_questions,
          createdAt: item.createdAt,
        }
      })

      res.status(200).json({
        status: 'success',
        result: mappedData,
      });
    } catch (err: unknown) {
      next(err);
    }
  }

  static async getEvaluationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const evaluationId = Number(req.params.id)
    if (isNaN(evaluationId)) {
      return next({
        name: 'BadRequest',
        errors: [{ message: 'Invalid ID' }],
      })
    }

    const options: FindOptions = {
      where: { id: evaluationId },
      include: [
        {
          model: EvaluationPoints,
          attributes: ['point'],
          include: [
            { model: Questions, attributes: ['id', 'question'] },
          ],
        },
      ],
    }

    try {
      const data: IEvaluationResponse | null = await Evaluations.findOne(options)
      if (!data) {
        return next({
          name: 'NotFound',
          errors: [{ message: `Evaluation with id ${evaluationId} not found` }],
        })
      }

      const dataJSON = JSON.parse(JSON.stringify(data))
      const answers = dataJSON.EvaluationPoints.map((ans: IEvaluationPoint) => ({
        questionID: ans.Question.id,
        question: ans.Question.question,
        point: ans.point,
      }))

      const total_questions = answers.length
      const score = answers.reduce((sum, a) => sum + a.point, 0) / total_questions

      const mappedData: IEvaluation = {
        id: dataJSON.id,
        first_name: dataJSON.first_name,
        last_name: dataJSON.last_name,
        department: dataJSON.department,
        years: dataJSON.years,
        overall_score: dataJSON.overall_score,
        comparation: dataJSON.comparation,
        comment: dataJSON.comment,
        answers,
        score,
        total_questions,
        createdAt: dataJSON.createdAt,
      }

      res.status(200).json({ 
        status: 'success', 
        result: mappedData 
      })
    } catch (err: unknown) {
      next(err)
    }
  }

  static async createEvaluation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload: IEvaluationCreate = req.body

      const evaluation = await Evaluations.create({
        first_name: payload.firstName,
        last_name: payload.lastName,
        department: payload.department,
        years: Number(payload.years),
        overall_score: Number(payload.overallScore),
        comparation: payload.comparation,
        comment: payload.comment,
      })

      const pointsData = payload.answers.map((ans: IAnswer) => ({
        evaluationId: Number(evaluation.id),
        questionId: Number(ans.questionID),
        point: Number(ans.point),
      }))
      await EvaluationPoints.bulkCreate(pointsData)

      res.status(201).json({
        status: 'success',
        result: {
          evaluation: evaluation,
          answers: pointsData,
        },
      })
    } catch (err: unknown) {
      next(err)
    }
  }
}