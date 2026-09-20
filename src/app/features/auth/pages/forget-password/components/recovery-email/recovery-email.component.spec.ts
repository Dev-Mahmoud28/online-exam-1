import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryEmailComponent } from './recovery-email.component';
import { of } from 'rxjs';
import { AuthService } from '../../../../../../../../dist/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RecoveryEmailComponent', () => {
  let component: RecoveryEmailComponent;
  let fixture: ComponentFixture<RecoveryEmailComponent>;
  let authServiceMock:{
    forgotPassword : ReturnType<typeof vi.fn>
  }
  let routerMock:{
    navigate:ReturnType<typeof vi.fn>
  }
  const mockRes = {
    status: true,
    code: 1,
    message: "success",
}
  beforeEach(async () => {
    authServiceMock = {
      forgotPassword: vi.fn().mockReturnValue(of(mockRes))
    }
    routerMock = {
      navigate: vi.fn()
    }
    await TestBed.configureTestingModule({
      imports: [RecoveryEmailComponent],
      providers:[
        {provide:AuthService, useValue:authServiceMock},
        {provide:Router, useValue:routerMock},
        {provide:ActivatedRoute, useValue: {}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoveryEmailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at first',()=>{
    expect(component.emailForm.invalid).toBe(true)
  });

  it('should has required',()=>{
    expect(component.emailControl.hasError('required')).toBe(true);
  });

  it('it should has email validation',()=>{
    component.emailControl.setValue('aaa');
    expect(component.emailControl.hasError('email')).toBe(true);
  });

  it('should submit email and navigate to reset page',()=>{
    component.emailControl.setValue('alex@yahoo.com');
    component.submitEmail();
    expect(localStorage.getItem('email')).toBe('alex@yahoo.com');
    expect(authServiceMock.forgotPassword).toHaveBeenCalledWith({
      email: component.emailControl.value,
      redirectUrl: "http://localhost:4200/reset-password"
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/reset-page'])
  });

  //Template
  it('should render email input with its correct properties',()=>{
    const emailInput = fixture.debugElement.query(By.css('#email'));
    expect(emailInput).toBeTruthy();
    expect(emailInput.componentInstance.type()).toBe('email');
    expect(emailInput.componentInstance.label()).toBe('Email');
    expect(emailInput.componentInstance.id()).toBe('email');
    expect(emailInput.componentInstance.placeholder()).toBe('user@example.com');
    expect(emailInput.componentInstance.control()).toBe(component.emailControl);
  });

  it('should render error banner',()=>{
    component.emailControl.markAsTouched();
    fixture.detectChanges();
    const errorBanner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(errorBanner).toBeTruthy();
  });

  it('should render next button and disabled',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
    expect(button.componentInstance.disabled()).toBe(true);
  });

  it('should be enabled when form is valid',()=>{
    component.emailControl.setValue('alex@yahoo.com')
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button.componentInstance.disabled()).toBe(false);
  })
});
