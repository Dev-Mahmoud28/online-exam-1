const baseUrl = `https://exam-app.elevate-bootcamp.cloud/api` as const

export class EndPoints {
    static readonly diplomas = `${baseUrl}/diplomas`;
    static readonly exams = `${baseUrl}/exams`;
    static readonly questions = `${baseUrl}/questions`;
    static readonly results = `${baseUrl}/submissions`
}