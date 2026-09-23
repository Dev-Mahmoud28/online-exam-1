import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasCardComponent } from './diplomas-card.component';
import { By } from '@angular/platform-browser';

describe('DiplomasCardComponent', () => {
  let component: DiplomasCardComponent;
  let fixture: ComponentFixture<DiplomasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomasCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiplomasCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('imgSrc', 'image.jpg');
    fixture.componentRef.setInput('title', 'Diploma');
    fixture.componentRef.setInput('describtion', 'hello');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Image',()=>{
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.attributes['src']).toBe('image.jpg');
    expect(image.attributes['alt']).toBe('Diploma');
  });

  it('should render title',()=>{
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).toContain('Diploma');
  });
  it('should render describtion',()=>{
    const describtion = fixture.debugElement.query(By.css('p'));
    expect(describtion.nativeElement.textContent).toContain('hello');
  });
});
