import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsComponent } from './exams.component';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { Exams } from '../../services/diplomas/interfaces/exams.interface';
import { of } from 'rxjs';
import { DiplomaById } from '../../services/diplomas/interfaces/diploma-by-id.interface';
import { By } from '@angular/platform-browser';

describe('ExamsComponent', () => {
  let component: ExamsComponent;
  let fixture: ComponentFixture<ExamsComponent>;
  let diplomasServiceMock: {
    getExams: ReturnType<typeof vi.fn>;
    getDiplomaById: ReturnType<typeof vi.fn>;
  };
  let breadcrumbsServiceMock: {
    setItems: ReturnType<typeof vi.fn>;
  };
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: vi.fn(),
      },
    },
  };
  let diplomaId = '123';
  const mockExamRes: Exams = {
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
  const mockExamList = Array.from({ length: 10 }, (_, i) => ({
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
  }));
  const mockDiplomaByIdRes: DiplomaById = {
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
  beforeEach(async () => {
    diplomasServiceMock = {
      getExams: vi.fn().mockReturnValue(of(mockExamRes)),
      getDiplomaById: vi.fn().mockReturnValue(of(mockDiplomaByIdRes)),
    };
    breadcrumbsServiceMock = {
      setItems: vi.fn(),
    };
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(diplomaId);
    await TestBed.configureTestingModule({
      imports: [ExamsComponent],
      providers: [
        { provide: DiplomasService, useValue: diplomasServiceMock },
        { provide: BreadcrumbService, useValue: breadcrumbsServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get diplomaId from url and then set it to diplomaId', () => {
    expect(component.diplomaId()).toBe('123');
  });

  it('should insure that getExams() called by diplomaId and return all exams', () => {
    expect(diplomasServiceMock.getExams).toHaveBeenCalledWith('123');
    expect(component.examsList()).toEqual(mockExamRes.payload.data);
  });

  it('should be called, return exam by id and set breadcrumb', () => {
    const title = mockDiplomaByIdRes.payload.diploma.title;
    const id = mockDiplomaByIdRes.payload.diploma.id;
    expect(diplomasServiceMock.getDiplomaById).toHaveBeenCalledWith('123');
    expect(component.diplomaTitle()).toBe(title);
    expect(breadcrumbsServiceMock.setItems).toHaveBeenCalledWith([
      { label: 'Diplomas', url: '/home/diplomas' },
      { label: title, url: `/home/exams/${id}` },
    ]);
  });

  it('should show exams based on visible value', () => {
    component.examsList.set(mockExamList);
    expect(component.showedExams().length).toBe(6);
    component.showMore();
    expect(component.showedExams().length).toBe(mockExamList.length);
  });

  //Template
  it('should render back button', () => {
    const backButton = fixture.debugElement.query(By.css('app-back-button'));
    expect(backButton).toBeTruthy();
  });

  it('should render page title', () => {
    const pageTitle = fixture.debugElement.query(By.css('app-page-title'));
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.componentInstance.title()).toBe(mockDiplomaByIdRes.payload.diploma.title);
  });

  it('should render 6 exam cards at first and all exams when showMore() run', () => {
    component.examsList.set(mockExamList);
    fixture.detectChanges();
    const examCards = fixture.debugElement.queryAll(By.css('app-exams-card'));
    expect(examCards.length).toBe(6);
    component.showMore();
    fixture.detectChanges();
    const newExamCards = fixture.debugElement.queryAll(By.css('app-exams-card'));
    expect(newExamCards.length).toBe(mockExamList.length);
  });

  it('should show all exams when view more button is clicked', () => {
    component.examsList.set(mockExamList);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.show-more'));
    const viewMoreP = fixture.debugElement.query(By.css('.show-more p'));
    expect(button).toBeTruthy();
    expect(viewMoreP.nativeElement.textContent).toBe('Scroll to view more');
    button.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.visible()).toBe(mockExamList.length);
  });

  it('should be removed when reach to end of list', () => {
    component.examsList.set(mockExamList);
    component.showMore();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.show-more'));
    expect(button).toBeFalsy();
  });

  it('should render end of list when all exams are visible', () => {
    component.examsList.set(mockExamList);
    component.showMore();
    fixture.detectChanges();
    const endList = fixture.debugElement.query(By.css('.end-list'));
    expect(endList).toBeTruthy();
    expect(endList.nativeElement.textContent).toBe('End of list');
  });
});
