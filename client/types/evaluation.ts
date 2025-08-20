export interface IEvaluationAnswer {
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
  comment: string | null
  answers: IEvaluationAnswer[]
  score: number
  total_questions: number
  createdAt: string
}