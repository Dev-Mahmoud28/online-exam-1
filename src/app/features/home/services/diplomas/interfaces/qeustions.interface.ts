export interface Qeustions {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  questions: Question[]
}

export interface Question {
  id: string
  text: string
  examId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  answers: Answer[]
}

export interface Answer {
  id: string
  text: string
}

