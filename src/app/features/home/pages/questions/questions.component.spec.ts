import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  let serviceMock: {
    getQuestion: ReturnType<typeof vi.fn>;
    getExamById: ReturnType<typeof vi.fn>;
    submission: ReturnType<typeof vi.fn>;
  };

  let activatedRouteMock: {
    snapshot: {
      paramMap: {
        get: ReturnType<typeof vi.fn>;
      };
    };
  };

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  let breadcrumbMock: {
    setItems: ReturnType<typeof vi.fn>;
  };

  const mockExamId = '123';

  const mockQuestionsRes: Qeustions = {
    status: true,
    code: 200,
    payload: {
      questions: [
        {
          id: 'question-1',
          text: 'What is Angular?',
          examId: '123',
          immutable: false,
          createdAt: '2026-09-16',
          updatedAt: '2026-09-16',
          answers: [
            {
              id: 'answer-1',
              text: 'Framework',
            },
            {
              id: 'answer-2',
              text: 'Database',
            },
          ],
        },
        {
          id: 'question-2',
          text: 'What is TypeScript?',
          examId: 'exam-123',
          immutable: false,
          createdAt: '2026-09-16',
          updatedAt: '2026-09-16',
          answers: [
            {
              id: 'answer-3',
              text: 'Programming language',
            },
            {
              id: 'answer-4',
              text: 'Database',
            },
          ],
        },
      ],
    },
  };

  const mockExamRes: ExamById = {
    status: true,
    code: 200,
    payload: {
      exam: {
        id: '123',
        title: 'Angular Exam',
        description: 'Angular exam',
        image: 'exam.jpg',
        duration: 30,
        diplomaId: 'diploma-1',
        immutable: false,
        createdAt: '2026-09-16',
        updatedAt: '2026-09-16',
        questionsCount: 2,
        diploma: {
          id: 'diploma-1',
          title: 'Angular Diploma',
          description: 'Angular Diploma',
          image: 'diploma.jpg',
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
