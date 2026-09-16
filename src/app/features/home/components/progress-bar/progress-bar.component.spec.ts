import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';
import { By } from '@angular/platform-browser';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('width', '50%');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set width', ()=>{
    const bar = fixture.debugElement.query(By.css('.bar'));
    expect(bar.nativeElement.style.width).toBe('50%')
  })
});
