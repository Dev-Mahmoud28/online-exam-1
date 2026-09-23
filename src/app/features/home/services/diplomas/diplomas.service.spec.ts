import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DiplomasService } from './diplomas.service';
import { DiplomasRes } from './interfaces/diplomas.interface';
import { EndPoints } from './enums/homeEndPoints';
import { DiplomaById } from './interfaces/diploma-by-id.interface';
import { Exams } from './interfaces/exams.interface';
import { ExamById } from './interfaces/exam-by-id.interface';
import { Qeustions } from './interfaces/qeustions.interface';
import { SubmissionReq, SubmissionRes } from './interfaces/submition.interface';
import { Result } from './interfaces/result.interface';
import { ResultById } from './interfaces/result-by-id.interface';

describe('DiplomasService', () => {
  let service: DiplomasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiplomasService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DiplomasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all diplomas', () => {
    const mockRes: DiplomasRes = {
      status: true,
      code: 1,
      payload: {
        data: [
          {
            id: '1',
            title: 'diploma',
            description: 'hello',
            image: 'url',
            immutable: true,
            createdAt: '2-1-2026',
            updatedAt: '8-1-2026',
          },
        ],
        metadata: {
          page: 2,
          limit: 2,
          total: 2,
          totalPages: 2,
        },
      },
    };
    let data: DiplomasRes | undefined;
    service.getDiplomas().subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.diplomas}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get diploma by id', () => {
    const mockRes: DiplomaById = {
      status: true,
      code: 2,
      payload: {
        diploma: {
          id: '2',
          title: 'Diploma',
          description: 'Hello',
          image: 'Url',
          immutable: false,
          createdAt: '2-1-2026',
          updatedAt: '8-1-2026',
          exams: [
            {
              id: '11',
              title: 'exam',
              description: 'tschuss',
              image: 'Url',
              duration: 30,
              createdAt: '2-1-2026',
              questionsCount: 10,
            },
          ],
        },
      },
    };
    let id: string = '2';
    let data: DiplomaById | undefined;
    service.getDiplomaById(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.diplomas}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get all exams', () => {
    const mockRes: Exams = {
      status: true,
      code: 3,
      payload: {
        data: [
          {
            id: 'string',
            title: 'string',
            description: 'string',
            image: 'string',
            duration: 30,
            diplomaId: 'string',
            immutable: false,
            createdAt: '2-1-2026',
            updatedAt: '8-1-2026',
            diploma: {
              id: '12',
              title: 'hello',
            },
            questionsCount: 10,
          },
        ],
        metadata: {
          page: 2,
          limit: 10,
          total: 15,
          totalPages: 2,
        },
      },
    };
    let id: string = '5';
    let data: Exams | undefined;
    service.getExams(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.exams}?diplomaId=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get exam by id', () => {
    const mockRes: ExamById = {
      status: true,
      code: 4,
      payload: {
        exam: {
          id: '5',
          title: 'Hallo',
          description: 'Guten Abend',
          image: 'Url',
          duration: 30,
          diplomaId: '2',
          immutable: true,
          createdAt: '123',
          updatedAt: '123',
          diploma: {
            id: '2',
            title: 'Hallo',
            description: 'Guten Abend',
            image: 'Url',
          },
          questionsCount: 10,
        },
      },
    };
    let id: string = '2';
    let data: ExamById | undefined;
    service.getExamById(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.exams}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get All questions', () => {
    const mockRes: Qeustions = {
      status: true,
      code: 5,
      payload: {
        questions: [
          {
            id: '123',
            text: 'string',
            examId: '10',
            immutable: true,
            createdAt: '123',
            updatedAt: '123',
            answers: [
              {
                id: '1',
                text: 'Was Machst Du',
              },
            ],
          },
        ],
      },
    };
    let id: string = '111';
    let data: Qeustions | undefined;
    service.getQuestion(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.questions}/exam/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should submit Answers', () => {
    const mockRes: SubmissionRes = {
      status: true,
      code: 6,
      payload: {
        submission: {
          id: 'string',
          userId: 'string',
          examId: 'string',
          examTitle: 'string',
          exam: {
            id: 'string',
            title: 'string',
            duration: 30,
          },
          score: 8,
          totalQuestions: 10,
          correctAnswers: 8,
          wrongAnswers: 2,
          startedAt: 'string',
          submittedAt: 'string',
          createdAt: 'string',
          updatedAt: 'string',
        },
        analytics: [],
      },
    };
    const reqData: SubmissionReq = {
      examId: '123',
      answers: [
        {
          questionId: 'string',
          answerId: 'string',
        },
      ],
      startedAt: 'string',
    };

    let data: SubmissionRes | undefined;
    service.submission(reqData).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.results}`);
    expect(req.request.body).toEqual(reqData);
    expect(req.request.method).toBe('POST');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get result', () => {
    const mockRes: Result = {
      status: true,
      code: 7,
      payload: {
        data: [],
        metadata: {
          page: 2,
          limit: 10,
          total: 15,
          totalPages: 2,
        },
      },
    };
    let id: string = '4';
    let data: Result | undefined;
    service.getResults(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.results}?examId=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });

  it('should get result by id', () => {
    const mockRes: ResultById = {
      status: true,
      code: 8,
      payload: {
        submission: {
          id: '8',
          examId: 'string',
          examTitle: 'string',
          score: 9,
          totalQuestions: 10,
          correctAnswers: 9,
          wrongAnswers: 1,
          startedAt: 'string',
          submittedAt: 'string',
        },
        analytics: [],
      },
    };
    let id: string = '8';
    let data: ResultById | undefined;
    service.submissionById(id).subscribe((response) => (data = response));
    const req = httpMock.expectOne(`${EndPoints.results}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
    expect(data).toEqual(mockRes);
  });
});
