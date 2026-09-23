import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsCardComponent } from './exams-card.component';
import { By } from '@angular/platform-browser';

describe('ExamsCardComponent', () => {
  let component: ExamsCardComponent;
  let fixture: ComponentFixture<ExamsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamsCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('imgSrc', 'image.jpg');
    fixture.componentRef.setInput('title', 'Diploma');
    fixture.componentRef.setInput('questionsCount', '10');
    fixture.componentRef.setInput('duration', '30');
    fixture.componentRef.setInput('description', 'Hello');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.getAttribute('src')).toBe('image.jpg');
    expect(image.nativeElement.getAttribute('alt')).toBe('Diploma');
  });

  it('should render Title', () => {
    const title = fixture.debugElement.query(By.css('h3'));
    expect(title.nativeElement.textContent).toContain('Diploma');
  });

  it('should render Question Count', () => {
    const questionCount = fixture.debugElement.queryAll(By.css('.title p'));
    expect(questionCount[0].nativeElement.textContent).toBe('10 Questions');
  });
  it('should render Duration', () => {
    const duration = fixture.debugElement.queryAll(By.css('.title p'));
    expect(duration[1].nativeElement.textContent).toBe('30 Minutes');
  });

  it('should render Start Button', () => {
    const startButton = fixture.debugElement.query(By.css('app-button'));
    expect(startButton).toBeTruthy();
    expect(startButton.nativeElement.textContent).toContain('Start');
  });
});
