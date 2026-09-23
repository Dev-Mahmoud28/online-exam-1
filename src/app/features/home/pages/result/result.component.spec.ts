import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { ResultById } from '../../services/diplomas/interfaces/result-by-id.interface';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let subServiceMock: {
    submissionById: ReturnType<typeof vi.fn>;
  };
  let activatedRoutMock = {
    snapshot: {
      paramMap: {
        get: vi.fn(),
      },
    },
  };
  let routerMock:{
    navigate:ReturnType<typeof vi.fn>
  }
  let locationMock :{
    back:ReturnType<typeof vi.fn>
  }
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
      analytics: [
        {
          questionId: 'string',
          questionText: 'string',
          selectedAnswer: {
            id: 'string',
            text: 'string',
          },
          isCorrect: true,
          correctAnswer: {
            id: 'string',
            text: 'string',
          },
        },
        {
          questionId: 'string',
          questionText: 'string',
          selectedAnswer: {
            id: 'string',
            text: 'string',
          },
          isCorrect: false,
          correctAnswer: {
            id: 'string',
            text: 'string',
          },
        },
      ],
    },
  };
  const mockId: string = '123';
  beforeEach(async () => {
    subServiceMock = {
      submissionById: vi.fn().mockReturnValue(of(mockRes)),
    };
    activatedRoutMock.snapshot.paramMap.get.mockReturnValue(mockId);
    routerMock = {
      navigate: vi.fn()
    }
    locationMock = {
      back: vi.fn()
    }
    await TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [
        { provide: DiplomasService, useValue: subServiceMock },
        { provide: ActivatedRoute, useValue: activatedRoutMock },
        {provide: Router, useValue: routerMock},
        {provide:Location, useValue:locationMock}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get submission id from url', () => {
    expect(activatedRoutMock.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.submissionId()).toBe('123');
  });

  it('should set submission details correctly', () => {
    const examTitle = mockRes.payload.submission.examTitle;
    const questionsNumber = mockRes.payload.submission.totalQuestions;
    const correct = mockRes.payload.submission.correctAnswers;
    const inCorrect = mockRes.payload.submission.wrongAnswers;
    const wrongAnswers = mockRes.payload.analytics[1];
    expect(subServiceMock.submissionById).toHaveBeenCalledWith(mockId);
    expect(component.examTitle()).toBe(examTitle);
    expect(component.questionsNumber()).toBe(questionsNumber);
    expect(component.correct()).toBe(correct);
    expect(component.inCorrect()).toBe(inCorrect);
    expect(component.wrongAnswers()[0]).toEqual(wrongAnswers);
  });

  it('should calculate progress correctly',()=>{
    component.correct.set(9);
    component.questionsNumber.set(10);
    expect(component.progress()).toBe(90)
  });

  it('should navigate to diplomas page',()=>{
    component.explore();
    expect(routerMock.navigate).toHaveBeenCalledWith(["/home/diplomas"])
  });

  it('should go back',()=>{
    component.restart();
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });

  //Template
  it('should render back button', ()=>{
    const backButton = fixture.debugElement.query(By.css('app-back-button'));
    expect(backButton).toBeTruthy();
  });

  it('should render page title',()=>{
    const examTitle = mockRes.payload.submission.examTitle;
    const pageTitle = fixture.debugElement.query(By.css('app-page-title'));
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.componentInstance.title()).toBe(`${examTitle} Questions`)
  });

  it('should render exam title and questions count',()=>{
    const title = fixture.debugElement.query(By.css('.exam-title'));
    const questionsCount = fixture.debugElement.query(By.css('.questions-count'));
    expect(title.nativeElement.textContent).toBe(mockRes.payload.submission.examTitle);
    expect(questionsCount.nativeElement.textContent).toContain(mockRes.payload.submission.totalQuestions)
  });

  it('should render progress, correct answers and incorrect answers',()=>{
    component.correct.set(5);
    component.inCorrect.set(5);
    component.questionsNumber.set(10);
    fixture.detectChanges();
    const chartProgress = fixture.debugElement.query(By.css('.chart-box .chart'));
    const correct = fixture.debugElement.query(By.css('.correct'));
    const incorrect = fixture.debugElement.query(By.css('.in-correct'));
    expect(chartProgress.nativeElement.style.getPropertyValue('--correct')).toBe('50%');
    expect(correct.nativeElement.textContent).toContain("5");
    expect(incorrect.nativeElement.textContent).toContain("5");
  });

  it('should render perfect message if there are no wrong answers',()=>{
    component.wrongAnswers.set([]);
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.perfect'));
    expect(message).toBeTruthy();
    expect(message.nativeElement.textContent).toContain('Perfect!');
  });

  it('should render wrong answers', ()=>{
    component.wrongAnswers.set([mockRes.payload.analytics[1]]);
    fixture.detectChanges();
    const wrongAnswers = fixture.debugElement.query(By.css('.wrong-answer'));
    const questionText = fixture.debugElement.query(By.css('ul li h3'));
    const selected = fixture.debugElement.query(By.css('ul li .selected-answer'));
    const correctAnswer = fixture.debugElement.query(By.css('ul li .correct-answer'));
    expect(wrongAnswers).toBeTruthy();
    expect(questionText.nativeElement.textContent).toBe(mockRes.payload.analytics[1].questionText);
    expect(selected.nativeElement.textContent).toBe(mockRes.payload.analytics[1].selectedAnswer?.text || 'Empty Answer');
    expect(correctAnswer.nativeElement.textContent).toBe(mockRes.payload.analytics[1].correctAnswer.text)
  });

  it('should render restart button and explore button',()=>{
    const restartButton = fixture.debugElement.query(By.css('.restart'));
    const exploreButton = fixture.debugElement.query(By.css('.explore'));
    expect(restartButton).toBeTruthy();
    expect(exploreButton).toBeTruthy();
  });

  it('should go back when restart button is clicked',()=>{
    const restartButton = fixture.debugElement.query(By.css('.restart'));
    restartButton.triggerEventHandler('click');
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should navigate to diplomas when explore button is clicked',()=>{
    const exploreButton = fixture.debugElement.query(By.css('.explore'));
    exploreButton.triggerEventHandler('click');
    expect(routerMock.navigate).toHaveBeenCalledWith(["/home/diplomas"])
  })
});
