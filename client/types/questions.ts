export interface IQuestion {
  id: number
  question: string
}

export interface IAnswers {
  [questionID: number]: number
}