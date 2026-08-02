import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasCardComponent } from './diplomas-card.component';

describe('DiplomasCardComponent', () => {
  let component: DiplomasCardComponent;
  let fixture: ComponentFixture<DiplomasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomasCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiplomasCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
