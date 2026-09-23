import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { QuestionsComponent } from './questions.component';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { Qeustions } from '../../services/diplomas/interfaces/qeustions.interface';
import { ExamById } from '../../services/diplomas/interfaces/exam-by-id.interface';

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
    serviceMock = {
      getQuestion: vi.fn().mockReturnValue(of(mockQuestionsRes)),

      getExamById: vi.fn().mockReturnValue(of(mockExamRes)),

      submission: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 200,
          payload: {
            submission: {
              id: '123',
            },
          },
        }),
      ),
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue(mockExamId),
        },
      },
    };

    routerMock = {
      navigate: vi.fn(),
    };

    breadcrumbMock = {
      setItems: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],

      providers: [
        {
          provide: DiplomasService,
          useValue: serviceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: BreadcrumbService,
          useValue: breadcrumbMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    vi.spyOn(component, 'start').mockImplementation(() => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exam id from route', () => {
    expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledWith('id');

    expect(component.examId()).toBe(mockExamId);
  });

  it('should get questions', () => {
    expect(serviceMock.getQuestion).toHaveBeenCalledWith(mockExamId);

    expect(component.questions()).toEqual(mockQuestionsRes.payload.questions);
  });

  it('should start timer after getting questions', () => {
    expect(component.start).toHaveBeenCalledTimes(1);
  });

  it('should get exam details', () => {
    expect(serviceMock.getExamById).toHaveBeenCalledWith(mockExamId);

    expect(component.duration()).toBe(mockExamRes.payload.exam.duration);

    expect(component.remainingTime()).toBe(mockExamRes.payload.exam.duration * 60);

    expect(component.title()).toBe(mockExamRes.payload.exam.title);

    expect(component.startedAt()).toBe(mockExamRes.payload.exam.createdAt);
  });

  it('should set breadcrumb', () => {
    expect(breadcrumbMock.setItems).toHaveBeenCalledWith([
      {
        label: 'Diplomas',
        url: '/home/diplomas',
      },
      {
        label: 'Angular Diploma',
        url: '/home/exams/diploma-1',
      },
      {
        label: 'Angular Exam Questions',
        url: '/home/questions/123',
      },
    ]);
  });

  it('should return current question', () => {
    component.currentIndex.set(0);
    expect(component.currentQuestion()).toEqual(mockQuestionsRes.payload.questions[0]);
  });

  it('should calculate question progress', () => {
    component.currentIndex.set(0);
    expect(component.progress()).toBe('50%');
    component.currentIndex.set(1);
    expect(component.progress()).toBe('100%');
  });

  it('should calculate time progress', () => {
    component.duration.set(10);
    component.remainingTime.set(300);
    expect(component.timeProgress()).toBe(50);
  });

  it('should not exceed 100% in time progress', () => {
    component.duration.set(10);
    component.remainingTime.set(0);
    expect(component.timeProgress()).toBe(100);
  });

  it('should format timer', () => {
    component.remainingTime.set(125);
    expect(component.timer()).toBe('02:05');
  });

  it('should format timer with leading zeros', () => {
    component.remainingTime.set(5);
    expect(component.timer()).toBe('00:05');
  });

  it('should go to next question', () => {
    component.currentIndex.set(0);
    component.nextQuestion();
    expect(component.currentIndex()).toBe(1);
  });

  it('should submit answers if current question is the last question', () => {
    component.currentIndex.set(1);

    const submitSpy = vi.spyOn(component, 'submitAnswers');

    component.nextQuestion();

    expect(component.currentIndex()).toBe(1);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should go to previous question', () => {
    component.currentIndex.set(1);
    component.previousQuestion();
    expect(component.currentIndex()).toBe(0);
  });

  it('should not go before first question', () => {
    component.currentIndex.set(0);
    component.previousQuestion();
    expect(component.currentIndex()).toBe(0);
  });

  it('should add selected answer', () => {
    component.selectedAnswer('question-1', 'answer-1');
    expect(component.answers()).toEqual([
      {
        questionId: 'question-1',
        answerId: 'answer-1',
      },
    ]);
  });

  it('should update selected answer if question already exists', () => {
    component.answers.set([
      {
        questionId: 'question-1',
        answerId: 'answer-1',
      },
    ]);
    component.selectedAnswer('question-1', 'answer-2');
    expect(component.answers()).toEqual([
      {
        questionId: 'question-1',
        answerId: 'answer-2',
      },
    ]);
  });

  it('should add answers for different questions', () => {
    component.selectedAnswer('question-1', 'answer-1');
    component.selectedAnswer('question-2', 'answer-3');
    expect(component.answers()).toEqual([
      {
        questionId: 'question-1',
        answerId: 'answer-1',
      },
      {
        questionId: 'question-2',
        answerId: 'answer-3',
      },
    ]);
  });

  it('should submit answers', () => {
    component.examId.set('123');
    component.startedAt.set('2026-09-16');
    component.answers.set([
      {
        questionId: 'question-1',
        answerId: 'answer-1',
      },
    ]);
    component.submitAnswers();
    expect(serviceMock.submission).toHaveBeenCalledWith({
      examId: '123',
      answers: [
        {
          questionId: 'question-1',
          answerId: 'answer-1',
        },
      ],
      startedAt: '2026-09-16',
    });
  });

  it('should navigate to result after submission', () => {
    component.submitAnswers();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/result', '123']);
  });

  //Template

  it('should render back button', () => {
    const backButton = fixture.debugElement.query(By.css('app-back-button'));
    expect(backButton).toBeTruthy();
  });

  it('should render page title', () => {
    const pageTitle = fixture.debugElement.query(By.css('app-page-title'));
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.componentInstance.title()).toBe('Angular Exam Questions');
  });

  it('should render exam title', () => {
    const title = fixture.debugElement.query(By.css('.title h4'));
    expect(title.nativeElement.textContent.trim()).toBe('Angular Exam');
  });

  it('should render question number and total', () => {
    const questions = fixture.debugElement.query(By.css('.questions'));
    expect(questions.nativeElement.textContent).toContain('1');
    expect(questions.nativeElement.textContent).toContain('2');
  });

  it('should render timer', () => {
    component.remainingTime.set(125);
    fixture.detectChanges();
    const timer = fixture.debugElement.query(By.css('.timer span'));
    expect(timer.nativeElement.textContent).toBe('02:05');
  });

  it('should render current question', () => {
    const question = fixture.debugElement.query(By.css('.ques-Title'));
    expect(question.nativeElement.textContent).toBe('What is Angular?');
  });

  it('should render current question answers', () => {
    const answers = fixture.debugElement.queryAll(By.css('.question-container label'));
    expect(answers.length).toBe(2);
    expect(answers[0].nativeElement.textContent).toContain('Framework');
    expect(answers[1].nativeElement.textContent).toContain('Database');
  });

  it('should call selectedAnswer when answer is clicked', () => {
    const selectedAnswerSpy = vi.spyOn(component, 'selectedAnswer');
    const answer = fixture.debugElement.query(By.css('.question-container input'));
    answer.triggerEventHandler('click');
    expect(selectedAnswerSpy).toHaveBeenCalledWith('question-1', 'answer-1');
  });

  it('should call previousQuestion when previous button is clicked', () => {
    const previousSpy = vi.spyOn(component, 'previousQuestion');
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    buttons[0].triggerEventHandler('click');
    expect(previousSpy).toHaveBeenCalledTimes(1);
  });

  it('should call nextQuestion when next button is clicked', () => {
    const nextSpy = vi.spyOn(component, 'nextQuestion');
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    buttons[1].triggerEventHandler('click');
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear interval on destroy', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    component.timerId = setInterval(() => {}, 1000);
    component.ngOnDestroy();
    expect(clearIntervalSpy).toHaveBeenCalledWith(component.timerId);
  });
});
