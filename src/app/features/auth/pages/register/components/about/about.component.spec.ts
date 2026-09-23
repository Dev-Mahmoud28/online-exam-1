import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormService } from '../../services/register-form.service';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
    url: string;
  };
  let registerFormMock: FormGroup
  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
      url: '',
    };
    registerFormMock = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: RegisterFormService, useValue: { registerForm: registerFormMock } },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should equal to registerForm from service', () => {
    expect(component.registerForm).toBe(registerFormMock);
  });

  it('should equal to control in service', () => {
    expect(component.firstNameControl).toBe(registerFormMock.get('firstName'));
  });

  it('should not run if controls are not valid', () => {
    component.submitForm();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should run submitForm() if controls are valid', () => {
    component.firstNameControl.setValue('Alex');
    component.lastNameControl.setValue('Merino');
    component.userNameControl.setValue('Alex123');
    component.phoneControl.setValue('0122846540');
    component.submitForm();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/create-password']);
  });

  // Tepmlate
  it('should render stepper component',()=>{
    const stepper = fixture.debugElement.query(By.css('app-stepper '));
    expect(stepper).toBeTruthy();
    expect(stepper.componentInstance.currentStep()).toBe(3);
  })

  it('should render first name input', () => {
    const firstnameInput = fixture.debugElement.query(By.css('#firstName'));
    expect(firstnameInput).toBeTruthy();
    expect(firstnameInput.componentInstance.type()).toBe('text');
    expect(firstnameInput.componentInstance.id()).toBe('firstName');
    expect(firstnameInput.componentInstance.label()).toBe('First name');
    expect(firstnameInput.componentInstance.placeholder()).toBe('Mahmoud');
    expect(firstnameInput.componentInstance.control()).toBe(component.firstNameControl);
  });

  it('should render last name input', () => {
    const lastnameInput = fixture.debugElement.query(By.css('#lastName'));
    expect(lastnameInput).toBeTruthy();
    expect(lastnameInput.componentInstance.type()).toBe('text');
    expect(lastnameInput.componentInstance.id()).toBe('lastName');
    expect(lastnameInput.componentInstance.label()).toBe('Last name');
    expect(lastnameInput.componentInstance.placeholder()).toBe('Mohamed');
    expect(lastnameInput.componentInstance.control()).toBe(component.lastNameControl);
  });

  it('should render username input', () => {
    const userNameInput = fixture.debugElement.query(By.css('#userName'));
    expect(userNameInput).toBeTruthy();
    expect(userNameInput.componentInstance.type()).toBe('text');
    expect(userNameInput.componentInstance.id()).toBe('userName');
    expect(userNameInput.componentInstance.label()).toBe('Username');
    expect(userNameInput.componentInstance.placeholder()).toBe('user123');
    expect(userNameInput.componentInstance.control()).toBe(component.userNameControl);
  });

  it('should render phone input', () => {
    const phoneInput = fixture.debugElement.query(By.css('#phone'));
    expect(phoneInput).toBeTruthy();
    expect(phoneInput.componentInstance.type()).toBe('tel');
    expect(phoneInput.componentInstance.id()).toBe('phone');
    expect(phoneInput.componentInstance.label()).toBe('Phone');
    expect(phoneInput.componentInstance.placeholder()).toBe('1012345678');
    expect(phoneInput.componentInstance.control()).toBe(component.phoneControl);
  });

  it('should not render error banner if no errors', () => {
    component.firstNameControl.setValue('Mahmoud');
    component.lastNameControl.setValue('Mohamed');
    component.userNameControl.setValue('Mahmoud123');
    component.phoneControl.setValue('1012345678');
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeFalsy();
  });

  it('should render error banner when a control is invalid and touched', () => {
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeTruthy();
  });

  it('should render button component',()=>{
    const burron = fixture.debugElement.query(By.css('app-button'));
    expect(burron).toBeTruthy();
  });
});
