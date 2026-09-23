import { TestBed } from '@angular/core/testing';

import { RegisterFormService } from './register-form.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have all register form controls', ()=>{
    expect(service.registerForm.get('email')).toBeTruthy();
    expect(service.registerForm.get('firstName')).toBeTruthy();
    expect(service.registerForm.get('lastName')).toBeTruthy();
    expect(service.registerForm.get('username')).toBeTruthy();
    expect(service.registerForm.get('phone')).toBeTruthy();
    expect(service.registerForm.get('password')).toBeTruthy();
    expect(service.registerForm.get('confirmPassword')).toBeTruthy();
  });

  it('should has email and required validations', ()=>{
    const email = service.registerForm.get('email')
    expect(email?.hasError('required')).toBe(true);
    email?.setValue('abc');
    expect(email?.hasError('email')).toBe(true);
  });

  it('should has required validation for firstName', ()=>{
    const firstName = service.registerForm.get('firstName')
    expect(firstName?.hasError('required')).toBe(true);
  });

  it('should has required validation for lastName', ()=>{
    const lastName = service.registerForm.get('lastName')
    expect(lastName?.hasError('required')).toBe(true);
  });

  it('should has required validation for username', ()=>{
    const username = service.registerForm.get('username')
    expect(username?.hasError('required')).toBe(true);
  });

  it('should has required validation for phone', ()=>{
    const phone = service.registerForm.get('phone')
    expect(phone?.hasError('required')).toBe(true);
  });

  it('should has required and pattern validation for password',()=>{
    const password = service.registerForm.get('password');
    expect(password?.hasError('required')).toBe(true);
    password?.setValue('abc');
    expect(password?.hasError('pattern')).toBe(true);
  });

  it('should has required validation for Confirm Password',()=>{
    const confirmPassword = service.registerForm.get('confirmPassword');
    expect(confirmPassword?.hasError('required')).toBe(true);
  });

  it('should has mismatch error', ()=>{
    service.registerForm.get('password')?.setValue('Alex$12345');
    service.registerForm.get('confirmPassword')?.setValue('Alex$123');
    expect(service.registerForm.hasError('mismatch')).toBe(true);
  });

  it('should not have mismatch error when passwords match', ()=>{
    service.registerForm.get('password')?.setValue('Alex$12345');
    service.registerForm.get('confirmPassword')?.setValue('Alex$12345');
    expect(service.registerForm.hasError('mismatch')).toBeFalsy();
  });
});
