import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { AuthService } from '../../../../../../../../dist/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { toast } from 'ngx-sonner';
import { By } from '@angular/platform-browser';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let authServiceMock: {
    resetPassword: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };
  let activatedRoutemock: {
    queryParamMap: Observable<{
      get: ReturnType<typeof vi.fn>;
    }>;
  };
  const mockData = {
    newPassword: 'alex$12345',
    confirmPassword: 'alex$12345',
    token: '123',
  };
  beforeEach(async () => {
    authServiceMock = {
      resetPassword: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 2,
          message: 'hello',
        }),
      ),
    };
    activatedRoutemock = {
      queryParamMap: of({
        get: vi.fn().mockReturnValue('123'),
      }),
    };
    routerMock = {
      navigate: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [NewPasswordComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: activatedRoutemock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('password form invalid at first', () => {
    expect(component.passwordForm.invalid).toBe(true);
  });

  it('should has required and pattern validation', () => {
    expect(component.passwordControl.hasError('required')).toBe(true);
    component.passwordControl.setValue('asda');
    expect(component.passwordControl.hasError('pattern')).toBe(true);
  });

  it('should validate confirm password and error mismatch', () => {
    expect(component.confirmPasswordControl.hasError('required')).toBe(true);
    component.passwordControl.setValue('abc');
    component.confirmPasswordControl.setValue('123');
    expect(component.passwordForm.hasError('mismatch')).toBe(true);
  });

  it('should have no errors when passwords match', () => {
    component.passwordControl.setValue('alex$12345');
    component.confirmPasswordControl.setValue('alex$12345');
    expect(component.passwordForm.errors).toBe(null);
  });

  it('should get token from route', () => {
    component.getToken();
    expect(component.token()).toBe('123');
  });

  it('should submit form and navigate to login page', () => {
    component.getToken();
    component.passwordControl.setValue('alex$12345');
    component.confirmPasswordControl.setValue('alex$12345');
    component.submitForm();
    expect(authServiceMock.resetPassword).toHaveBeenCalledWith(mockData);
  });

  it('should navigate to login page',()=>{
    component.getToken();
    component.passwordControl.setValue('alex$12345');
    component.confirmPasswordControl.setValue('alex$12345');
    component.submitForm();
    expect(routerMock.navigate).toHaveBeenCalledWith(['./login']);
  });

  it('should run success toast',()=>{
    component.getToken();
    component.passwordControl.setValue('alex$12345');
    component.confirmPasswordControl.setValue('alex$12345');
    const spy = vi.spyOn(toast, 'success');
    component.submitForm();
    expect(spy).toHaveBeenCalledWith('Your password has been updated')
  });

  //Template

  it('should render password input with its correct properties',()=>{
    fixture.detectChanges();
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.componentInstance.type()).toBe('password');
    expect(passwordInput.componentInstance.id()).toBe('password');
    expect(passwordInput.componentInstance.label()).toBe('Password');
    expect(passwordInput.componentInstance.placeholder()).toBe('********');
    expect(passwordInput.componentInstance.control()).toBe(component.passwordControl);
  });

  it('should render confirm password input with its correct properties',()=>{
    fixture.detectChanges();
    const confirmPasswordInput = fixture.debugElement.query(By.css('#rePassword'));
    expect(confirmPasswordInput).toBeTruthy();
    expect(confirmPasswordInput.componentInstance.type()).toBe('password');
    expect(confirmPasswordInput.componentInstance.id()).toBe('rePassword');
    expect(confirmPasswordInput.componentInstance.label()).toBe('Confirm Password');
    expect(confirmPasswordInput.componentInstance.placeholder()).toBe('********');
    expect(confirmPasswordInput.componentInstance.control()).toBe(component.confirmPasswordControl);
  });

  it('should return error message if passwords do not match',()=>{
    component.passwordControl.setValue('alex$123');
    component.confirmPasswordControl.setValue('alex$12');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.error'));
    expect(msg).toBeTruthy();
    expect(msg.nativeElement.textContent).toBe('Confrirm Password Does Not Match')
  });

  it('should render error banner if rquired or toutched',()=>{
    component.passwordForm.markAllAsTouched();
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeTruthy();
  });

  it('should render reset button and disabled at first',()=>{
    fixture.detectChanges();
    const resetButton = fixture.debugElement.query(By.css('app-button'));
    expect(resetButton).toBeTruthy();
    expect(resetButton.componentInstance.disabled()).toBe(true)
  });

  it('should be enabled if the form is valid',()=>{
    component.passwordControl.setValue('Alex$12345');
    component.confirmPasswordControl.setValue('Alex$12345');
    fixture.detectChanges();
    const resetButton = fixture.debugElement.query(By.css('app-button'));
    expect(resetButton.componentInstance.disabled()).toBe(false)
  });
});
