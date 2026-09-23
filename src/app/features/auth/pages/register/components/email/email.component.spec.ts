import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComponent } from './email.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../../../dist/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterFormService } from '../../services/register-form.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let authServiceMock: {
    sendEmail: ReturnType<typeof vi.fn>;
  };
  let registerFormMock: FormGroup;
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };
  let mockReq = {
    email: 'ea@gmail.com',
  };
  beforeEach(async () => {
    authServiceMock = {
      sendEmail: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 123456,
          message: 'success',
        }),
      ),
    };
    routerMock = {
      navigate: vi.fn(),
    };
    registerFormMock = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    });
    await TestBed.configureTestingModule({
      imports: [EmailComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: RegisterFormService,
          useValue: {
            registerForm: registerFormMock,
          },
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should equals to register form in service', () => {
    expect(component.registerForm).toBe(registerFormMock);
  });

  it('should get email control', () => {
    expect(component.emailControl).toBe(registerFormMock.get('email'));
  });

  it('should send valid email', () => {
    component.emailControl.setValue('ae@gmail.com');
    const data = {
      email: component.emailControl.value,
    };
    component.sendEmail();
    expect(localStorage.getItem('email')).toBe('ae@gmail.com');
    expect(authServiceMock.sendEmail).toHaveBeenCalledWith(data);
    expect(routerMock.navigate).toHaveBeenCalledWith(['./register/otp'])
  });

  //Template
  it('should render email input',()=>{
    const emailInput = fixture.debugElement.query(By.css('#email'));
    expect(emailInput.componentInstance.type()).toBe('email');
    expect(emailInput.componentInstance.label()).toBe('Email');
    expect(emailInput.componentInstance.id()).toBe('email');
    expect(emailInput.componentInstance.placeholder()).toBe('user@example.com');
    expect(emailInput.componentInstance.control()).toBe(component.emailControl);
  });

  it('should not render error banner if email is valid',()=>{
    component.emailControl.setValue('ae@gmail.com');
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeFalsy();
  });

  it('should render error banner if email is invalid',()=>{
    component.emailControl.markAsTouched()
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeTruthy();
  });

  it('should render button component',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
  })
});
