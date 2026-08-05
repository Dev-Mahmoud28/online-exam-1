import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsCardComponent } from './exams-card.component';

describe('ExamsCardComponent', () => {
  let component: ExamsCardComponent;
  let fixture: ComponentFixture<ExamsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
