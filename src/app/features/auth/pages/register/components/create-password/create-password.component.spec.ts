import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { passwordValidation } from '../../../../../../shared/utils/password-validation';
import { AuthService } from '../../../../../../../../dist/auth';
import { Router } from '@angular/router';
import { RegisterFormService } from '../../services/register-form.service';
import { toast } from 'ngx-sonner';
import { confirmPassword } from '../../../../../../shared/utils/confirm-password';
import { By } from '@angular/platform-browser';

describe('CreatePasswordComponent', () => {
  let component: CreatePasswordComponent;
  let fixture: ComponentFixture<CreatePasswordComponent>;
  let authServiceMock: {
    register: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
    url:string
  };
  let mockReq = {
    username: "m123",
    email: "m@gmail.com",
    password: "Alex$12345",
    confirmPassword: "Alex$12345",
    firstName: "alex",
    lastName: "max",
    phone: "01043859210",
}
  let registerFormMock: FormGroup;
  beforeEach(async () => {
    authServiceMock = {
      register: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 1,
          payload: {},
        }),
      ),
    };
    routerMock = {
      navigate: vi.fn(),
      url: ''
    };
    registerFormMock = new FormGroup({
        email: new FormControl("", {validators:[Validators.required, Validators.email]}),
        firstName: new FormControl("", {validators:[Validators.required]}),
        lastName: new FormControl("", {validators:[Validators.required]}),
        username: new FormControl("", {validators:[Validators.required]}),
        phone: new FormControl("", {validators:[Validators.required]}),
        password: new FormControl("", {validators:[Validators.required, Validators.pattern(passwordValidation)]}),
        confirmPassword: new FormControl("", {validators:[Validators.required]}),
      }, {validators:[confirmPassword]});
    
    await TestBed.configureTestingModule({
      imports: [CreatePasswordComponent],
      providers:[
        {provide:AuthService, useValue:authServiceMock},
        {provide:Router, useValue:routerMock},
        {provide:RegisterFormService, useValue:{registerForm: registerFormMock}},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get register form from service',()=>{
    expect(component.registerForm).toBe(registerFormMock);
  });

  it('should get password control', ()=>{
    expect(component.passwordControl).toBe(registerFormMock.get('password'));
  });

  it('should get rePassword control', ()=>{
    expect(component.rePasswordControl).toBe(registerFormMock.get('confirmPassword'));
  });

  it('should get email from localStorage', ()=>{
    localStorage.setItem("email", "alex@gmail.com");
    component.getEmail();
    expect(component.registerForm.get('email')?.value).toBe('alex@gmail.com');
  });

  it('should send form and navigate to login page',()=>{
    localStorage.setItem('email', 'alex@gmail.com')
    component.passwordControl.setValue('Alex$12345');
    component.rePasswordControl.setValue('Alex$12345');
    const spy = vi.spyOn(toast, 'success');
    component.sendForm();
    expect(authServiceMock.register).toHaveBeenCalledWith(registerFormMock.value)
    expect(spy).toHaveBeenCalledWith('Your Account Has Been Created Successfylly')
    expect(routerMock.navigate).toHaveBeenCalledWith(["./login"]);
  });

  it('should not send form if invalid',()=>{
    component.passwordControl.setValue('Alex$12345');
    component.rePasswordControl.setValue('Alex$12');
    component.sendForm();
    expect(authServiceMock.register).not.toHaveBeenCalled()
  });

  //Template
  it('should render stepper component',()=>{
    fixture.detectChanges();
    const stepper = fixture.debugElement.query(By.css('app-stepper'));
    expect(stepper).toBeTruthy();
    expect(stepper.componentInstance.currentStep()).toBe(4);
  })

  it('should render password input',()=>{
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.componentInstance.type()).toBe("password");
    expect(passwordInput.componentInstance.id()).toBe("password");
    expect(passwordInput.componentInstance.label()).toBe("Password");
    expect(passwordInput.componentInstance.placeholder()).toBe("********");
    expect(passwordInput.componentInstance.control()).toBe(component.passwordControl);
  });

  it('should render rePassword input',()=>{
    fixture.detectChanges();
    const rePasswordInput = fixture.debugElement.query(By.css('#rePassword'));
    expect(rePasswordInput).toBeTruthy();
    expect(rePasswordInput.componentInstance.type()).toBe("password");
    expect(rePasswordInput.componentInstance.id()).toBe("rePassword");
    expect(rePasswordInput.componentInstance.label()).toBe("Confirm Password");
    expect(rePasswordInput.componentInstance.placeholder()).toBe("********");
    expect(rePasswordInput.componentInstance.control()).toBe(component.rePasswordControl);
  });

  it('should show error message if rePassword does not match',()=>{
    component.passwordControl.setValue('Alex$12345');
    component.rePasswordControl.setValue('Alex$123');
    fixture.detectChanges()
    const matchError = fixture.debugElement.query(By.css('.error'));
    expect(matchError).toBeTruthy();
    expect(matchError.nativeElement.textContent).toBe('Confrirm Password Does Not Match')
  });

  it('should do not show error message if rePassword match',()=>{
    component.passwordControl.setValue('Alex$12345');
    component.rePasswordControl.setValue('Alex$12345');
    fixture.detectChanges()
    const matchError = fixture.debugElement.query(By.css('.error'));
    expect(matchError).toBeFalsy();
  });

  it('should render error banner component if invalid inputs',()=>{
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeTruthy();
  });

  it('should not render error banner component if valid inputs',()=>{
    component.passwordControl.setValue('Alex$12345');
    component.rePasswordControl.setValue('Alex$12345');
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeFalsy();
  });

  it('should render button component',()=>{
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
  })
});
