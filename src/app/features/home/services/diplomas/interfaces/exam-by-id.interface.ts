export interface ExamById {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  exam: Exam
}

export interface Exam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  diplomaId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  diploma: Diploma
  questionsCount: number
}

export interface Diploma {
  id: string
  title: string
  description: string
  image: string
}


export interface Exam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  questionsCount: number
  diplomaId: string
  diploma: Diploma
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface Diploma {
  id: string
  title: string
}
