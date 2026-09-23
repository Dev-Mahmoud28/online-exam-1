import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login.component';
import { AuthService } from '../../../../../../dist/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceMock: {
    login: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };
  const loginResMock = {
    firstname: 'alex',
    email: 'alex@gmail.com',
    token: 'string',
  };
  const loginReqMock = {
    username: 'alex123',
    password: 'Alex$12345',
  };
  beforeEach(async () => {
    authServiceMock = {
      login: vi.fn().mockReturnValue(of(loginResMock)),
    };
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at first', () => {
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should have required validation for username and password', () => {
    expect(component.userNameControl.hasError('required')).toBe(true);
    expect(component.passwordControl.hasError('required')).toBe(true);
  });

  it('should be valid',()=>{
    component.userNameControl.setValue('alex123');
    component.passwordControl.setValue('Alex$12345');
    expect(component.loginForm.valid).toBe(true);
  });

  it('should submit form and send data', () => {
    component.loginForm.setValue(loginReqMock)
    component.submitForm();
    expect(authServiceMock.login).toHaveBeenCalledWith(component.loginForm.value);
  });

  it('should set data to local storage',()=>{
    component.loginForm.setValue(loginReqMock)
    component.submitForm();
    expect(localStorage.getItem('token')).toBe(loginResMock.token);
    expect(localStorage.getItem('firstname')).toBe(loginResMock.firstname);
    expect(localStorage.getItem('email')).toBe(loginResMock.email);
  })

  it('should navigate to home page in case of success response', () => {
    component.loginForm.setValue(loginReqMock)
    component.submitForm();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/diplomas']);
  });

  // Template

  it('should render Login',()=>{
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.textContent).toBe('Login');
  });

  it('should render username input with its correct properties value', ()=>{
    fixture.detectChanges();
    const username = fixture.debugElement.query(By.css('#userName'));
    expect(username).toBeTruthy();
    expect(username.componentInstance.type()).toBe('text');
    expect(username.componentInstance.placeholder()).toBe('User123');
    expect(username.componentInstance.label()).toBe('Username');
    expect(username.componentInstance.id()).toBe('userName');
    expect(username.componentInstance.control()).toBe(component.userNameControl);
  });

  it('should render password input with its correct properties value', ()=>{
    fixture.detectChanges();
    const password = fixture.debugElement.query(By.css('#password'));
    expect(password).toBeTruthy();
    expect(password.componentInstance.type()).toBe('password');
    expect(password.componentInstance.placeholder()).toBe('*******');
    expect(password.componentInstance.label()).toBe('Password');
    expect(password.componentInstance.id()).toBe('password');
    expect(password.componentInstance.control()).toBe(component.passwordControl);
  });

  it('should render button and send Login to it',()=>{
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('app-button'));
    expect(loginButton).toBeTruthy();
    expect(loginButton.componentInstance.disabled()).toBe(true)
    expect(loginButton.componentInstance.type()).toBe('submit');
    expect(loginButton.nativeElement.textContent).toBe('Login');
  });

  it('should be enabled when form is valid',()=>{
    component.loginForm.setValue(loginReqMock);
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('app-button'));
    expect(loginButton.componentInstance.disabled()).toBe(false);
  });

  it('should not render error-banner',()=>{
    fixture.detectChanges()
    const errorBanner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(errorBanner).toBeFalsy();
  });

  it('should render error-banner when touched', ()=>{
    component.userNameControl.markAsTouched();
    fixture.detectChanges();
    const errorBanner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(errorBanner).toBeTruthy();
  })
});
