import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { of } from 'rxjs';
import { AccountService } from '../../services/account/account.service';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { toast } from 'ngx-sonner';
import { By } from '@angular/platform-browser';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let accountServiceMock: {
    changePassword: ReturnType<typeof vi.fn>;
  };
  let breadcrumbMock: {
    setItems: ReturnType<typeof vi.fn>;
  };
  const mockReq = {
    currentPassword: 'Alex$12345',
    newPassword: 'Alex$6789',
    confirmPassword: 'Alex$6789',
  };
  const mockRes = {
    status: true,
    code: 1,
    message: 'string',
  };
  beforeEach(async () => {
    accountServiceMock = {
      changePassword: vi.fn().mockReturnValue(of(mockRes)),
    };
    breadcrumbMock = {
      setItems: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ChangePasswordComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: BreadcrumbService, useValue: breadcrumbMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at first', () => {
    expect(component.passwordForm.invalid).toBe(true);
  });

  it('should has requierd validation for currentPassword', () => {
    expect(component.currentPassword.hasError('required')).toBe(true);
  });

  it('should has requierd and pattern validation for new password', () => {
    expect(component.newPassword.hasError('required')).toBe(true);
    component.newPassword.setValue('alex123');
    expect(component.newPassword.hasError('pattern')).toBe(true);
  });

  it('should has requierd and pattern validation for confirm password', () => {
    expect(component.confirmPassword.hasError('required')).toBe(true);
  });

  it('should has mismatch error if passwords not match', () => {
    component.newPassword.setValue('Alex$67890');
    component.confirmPassword.setValue('Alex$678');
    expect(component.passwordForm.hasError('mismatch')).toBe(true);
  });

  it('should send breadcrumb to breadcrumb service', () => {
    fixture.detectChanges();
    expect(breadcrumbMock.setItems).toHaveBeenCalledWith([
      { label: 'Account', url: '/account/profile' },
      { label: 'Change Password', url: '/account/change-password' },
    ]);
  });

  it('should call changepassword form service and send data', () => {
    const spy = vi.spyOn(toast, 'success');
    component.currentPassword.setValue('Alex$12345');
    component.newPassword.setValue('Alex$6789');
    component.confirmPassword.setValue('Alex$6789');
    component.changePassword();
    expect(accountServiceMock.changePassword).toHaveBeenCalledWith(mockReq);
    expect(spy).toHaveBeenCalledWith(mockRes.message);
  });

  //Template

  it('should render current password input', () => {
    fixture.detectChanges();
    const current = fixture.debugElement.query(By.css('#current-password'));
    expect(current).toBeTruthy();
    expect(current.componentInstance.type()).toBe('password');
    expect(current.componentInstance.label()).toBe('Current Password');
    expect(current.componentInstance.control()).toBe(component.currentPassword);
  });
  it('should render new password input', () => {
    fixture.detectChanges();
    const newPass = fixture.debugElement.query(By.css('#new-password'));
    expect(newPass).toBeTruthy();
    expect(newPass.componentInstance.type()).toBe('password');
    expect(newPass.componentInstance.label()).toBe('New Password');
    expect(newPass.componentInstance.control()).toBe(component.newPassword);
  });
  it('should render confirm password input', () => {
    fixture.detectChanges();
    const confirmPass = fixture.debugElement.query(By.css('#confirm-password'));
    expect(confirmPass).toBeTruthy();
    expect(confirmPass.componentInstance.type()).toBe('password');
    expect(confirmPass.componentInstance.label()).toBe('Confirm New Password');
    expect(confirmPass.componentInstance.control()).toBe(component.confirmPassword);
  });

  it('should render mismatch error message if passwords mismatch', () => {
    component.newPassword.setValue('Alex$67890');
    component.confirmPassword.setValue('Alex$678');
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('.error'));
    expect(errorMsg).toBeTruthy();
  });

  it('should render error banner if password form errors', () => {
    component.newPassword.setValue('Alex$67890');
    component.confirmPassword.setValue('Alex$678');
    component.passwordForm.markAllAsTouched();
    fixture.detectChanges();
    const banner = fixture.debugElement.query(By.css('app-error-banner'));
    expect(banner).toBeTruthy();
  });

  it('should render button component and disabled', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
    expect(button.componentInstance.disabled()).toBe(true)
  });
  
  it('should be enabled if form valid', () => {
    component.currentPassword.setValue('Alex$12345');
    component.newPassword.setValue('Alex$67890');
    component.confirmPassword.setValue('Alex$67890');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button.componentInstance.disabled()).toBe(false);
  });
});
