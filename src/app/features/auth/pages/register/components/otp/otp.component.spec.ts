import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpComponent } from './otp.component';
import { of } from 'rxjs';
import { AuthService } from '../../../../../../../../dist/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { By } from '@angular/platform-browser';

describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;
  let authServiceMock: {
    confirmEmail: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
    url: string;
  };
  beforeEach(async () => {
    authServiceMock = {
      confirmEmail: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 1,
          message: 'string',
        }),
      ),
    };
    routerMock = {
      navigate: vi.fn(),
      url: '',
    };
    localStorage.setItem('email', 'Alex@gmail.com');
    await TestBed.configureTestingModule({
      imports: [OtpComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send email and code and navigate to about page', () => {
    const spy = vi.spyOn(toast, 'success');
    component.value.set(123456);
    component.printValue();
    const mockReq = {
      email: 'Alex@gmail.com',
      code: 123456,
    };
    expect(authServiceMock.confirmEmail).toHaveBeenCalledWith(mockReq);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/register/about']);
    expect(spy).toHaveBeenCalledWith('Your email is verified successfully');
  });

  it('should not send email and code if valueLength < 6', () => {
    component.value.set(1234);
    component.printValue();
    expect(authServiceMock.confirmEmail).not.toHaveBeenCalled();
  });

  it('should get email from local storage', ()=>{
    expect(component.sentEmail()).toBe('Alex@gmail.com');
  });

  it('should return the length', ()=>{
    component.value.set(123456);
    expect(component.valueLength()).toBe(6);
  });
  
  //Template
  it('should render stepper component',()=>{
    const stepper = fixture.debugElement.query(By.css('app-stepper'));
    expect(stepper).toBeTruthy();
    expect(stepper.componentInstance.currentStep()).toBe(2)
  });

  it('should render sent email',()=>{
    const sentEmail = fixture.debugElement.query(By.css('p > span'));
    expect(sentEmail.nativeElement.textContent).toBe('Alex@gmail.com');
  });

  it('should render otp input',()=>{
    const otpInput = fixture.debugElement.query(By.css('p-inputotp'));
    expect(otpInput).toBeTruthy();
    expect(otpInput.componentInstance.length).toBe(6);
  });

  it('should render button component',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
  });
  
  it('should be disabled if valueLength < 6',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button.componentInstance.disabled()).toBe(true);
  });

  it('should be enabeld if valueLength = 6',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    component.value.set(123456);
    fixture.detectChanges();
    expect(button.componentInstance.disabled()).toBe(false);
  });

  it('should run printValue() when clicked',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    component.value.set(123456);
    const spy = vi.spyOn(authServiceMock, 'confirmEmail');
    button.triggerEventHandler('click');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({
      email:'Alex@gmail.com',
      code: 123456
    });
  });
});
