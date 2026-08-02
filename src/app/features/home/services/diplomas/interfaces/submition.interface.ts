export interface SubmissionRes {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  submission: Submission
  analytics: Analytic[]
}

export interface Submission {
  id: string
  userId: string
  examId: string
  examTitle: string
  exam: Exam
  score: number
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  startedAt: string
  submittedAt: string
  createdAt: string
  updatedAt: string
}

export interface Exam {
  id: string
  title: string
  duration: number
}

export interface Analytic {
  questionId: string
  questionText: string
  selectedAnswer: SelectedAnswer
  isCorrect: boolean
  correctAnswer: CorrectAnswer
}

export interface SelectedAnswer {}

export interface CorrectAnswer {}


export interface SubmissionReq {
  examId: string
  answers: Answer[]
  startedAt: string
}

export interface Answer {
  questionId: string
  answerId: string
}
