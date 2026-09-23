import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;
  let routerMock:{
    url:string,
  }
  beforeEach(async () => {
    routerMock = {
      url: '',
    }
    await TestBed.configureTestingModule({
      imports: [StepperComponent],
      providers:[
        {provide: Router, useValue:routerMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentStep', 1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentStep to 1',()=>{
    expect(component.currentStep()).toBe(1);
  });

  it('should check if url includes email',()=>{
    routerMock.url = '/register/email';
    component.isEmailPage();
    expect(component.isEmail).toBe(true);
  });

  it('should be false if url not includes email',()=>{
    routerMock.url = '/register/about';
    component.isEmailPage();
    expect(component.isEmail).toBe(false);
  });

  // Template 
  it('should not render ol if isEmail equals true',()=>{
    routerMock.url = '/register/email'
    component.isEmailPage();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('ol'));
    expect(list).toBeFalsy();
  });

  it('should render ol if isEmail equals false',()=>{
    routerMock.url = '/register/about'
    component.isEmailPage();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('ol'));
    expect(list).toBeTruthy();
  });

  it('should has active class for second step',()=>{
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[1].classes['active']).toBe(true);
  });

  it('should has no active class if current step = 3',()=>{
    fixture.componentRef.setInput('currentStep', 3);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[1].classes['active']).toBeFalsy();
  });

  it('should has active class for third step',()=>{
    fixture.componentRef.setInput('currentStep', 3);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[2].classes['active']).toBe(true);
  });
  it('should has notActive class if current step = 4',()=>{
    fixture.componentRef.setInput('currentStep', 4);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[2].classes['notActive']).toBe(true);
  });

  it('should has active class for fourth step',()=>{
    fixture.componentRef.setInput('currentStep', 4);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[3].classes['active']).toBe(true);
  });
  it('should has not active class if currentStep not 4',()=>{
    fixture.componentRef.setInput('currentStep', 3);
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(By.css('ol li span'));
    expect(spans[3].classes['active']).toBeFalsy();
  });

});
