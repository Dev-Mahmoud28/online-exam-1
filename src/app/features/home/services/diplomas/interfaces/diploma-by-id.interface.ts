export interface DiplomaById {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  diploma: Diploma
}

export interface Diploma {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  exams: Exam[]
}

export interface Exam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  createdAt: string
  questionsCount: number
}
