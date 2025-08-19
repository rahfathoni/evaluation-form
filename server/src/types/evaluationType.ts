export interface IQuestion {
  id: number
  question: string
}

export interface IEvaluationPoint {
  point: number
  Question: IQuestion
}

export interface IEvaluationResponse {
  id: number
  first_name: string
  last_name: string
  department: string
  years: number
  overall_score: number
  comparation: string
  comment: string
  createdAt: string
  updatedAt: string
  EvaluationPoints: IEvaluationPoint[]
}

export interface IAnswer {
  questionID: number
  question: string
  point: number
}

export interface IEvaluation {
  id: number
  first_name: string
  last_name: string
  department: string
  years: number
  overall_score: number
  comparation: string
  comment: string
  answers: IAnswer[]
  score: number
  total_questions: number
  createdAt: string
}

export interface IEvaluationCreate {
  firstName: string
  lastName: string
  department: string
  years: number
  overallScore: number
  comparation: string
  comment: string | null
  answers: Omit<IAnswer, 'question'>[]
}