import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { AccountService } from '../../services/account/account.service';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let accountServiceMock: {
    getProfile: ReturnType<typeof vi.fn>;
    setNewProfile: ReturnType<typeof vi.fn>;
    sendNewEmail: ReturnType<typeof vi.fn>;
    confirmEmail: ReturnType<typeof vi.fn>;
    deleteAccount: ReturnType<typeof vi.fn>;
  };
  let breadcrumbServiceMock: {
    setItems: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
    url: string;
  };
  const profileResponse = {
    status: true,
    code: 200,
    payload: {
      user: {
        username: 'alex123',
        email: 'alex@gmail.com',
        firstName: 'Alex',
        lastName: 'Max',
        phone: '01012345678',
      },
    },
  };

  beforeEach(async () => {
    accountServiceMock = {
      getProfile: vi.fn().mockReturnValue(of(profileResponse)),
      setNewProfile: vi.fn().mockReturnValue(
        of({
          status: true,
          message: 'Profile updated successfully',
        }),
      ),
      sendNewEmail: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 1,
          message: 'OTP sent successfully',
        }),
      ),
      confirmEmail: vi.fn().mockReturnValue(
        of({
          status: true,
          payload: {
            user: {
              email: 'alex@gmail.com',
            },
          },
        }),
      ),
      deleteAccount: vi.fn().mockReturnValue(
        of({
          status: true,
          code: 1,
          message: 'Account deleted successfully',
        }),
      ),
    };
    breadcrumbServiceMock = {
      setItems: vi.fn(),
    };
    routerMock = {
      navigate: vi.fn(),
      url: '',
    };
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],

      providers: [
        {
          provide: AccountService,
          useValue: accountServiceMock,
        },
        {
          provide: BreadcrumbService,
          useValue: breadcrumbServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all profile form controls', () => {
    expect(component.profileForm.get('firstName')).toBeTruthy();
    expect(component.profileForm.get('lastName')).toBeTruthy();
    expect(component.profileForm.get('phone')).toBeTruthy();
    expect(component.profileForm.get('email')).toBeTruthy();
    expect(component.profileForm.get('otp')).toBeTruthy();
  });

  it('should have required validators for firstName, lastName, phone and otp', () => {
    component.firstnameControl.setValue('');
    component.lastnameControl.setValue('');
    component.phoneControl.setValue('');
    component.otpControl.setValue('');
    expect(component.firstnameControl.hasError('required')).toBe(true);
    expect(component.lastnameControl.hasError('required')).toBe(true);
    expect(component.phoneControl.hasError('required')).toBe(true);
    expect(component.otpControl.hasError('required')).toBe(true);
  });

  it('should validate email', () => {
    const email = component.emailControl;
    email.setValue('');
    expect(email.hasError('required')).toBe(true);
    email.setValue('invalid-email');
    expect(email.hasError('email')).toBe(true);
    email.setValue('alex@gmail.com');
    expect(email.hasError('email')).toBe(false);
  });

  it('should return firstName control', () => {
    expect(component.firstnameControl).toBe(component.profileForm.get('firstName'));
  });

  it('should return lastName control', () => {
    expect(component.lastnameControl).toBe(component.profileForm.get('lastName'));
  });

  it('should return phone control', () => {
    expect(component.phoneControl).toBe(component.profileForm.get('phone'));
  });

  it('should return email control', () => {
    expect(component.emailControl).toBe(component.profileForm.get('email'));
  });

  it('should return otp control', () => {
    expect(component.otpControl).toBe(component.profileForm.get('otp'));
  });

  it('should show email modal', () => {
    component.showEmailModal();
    expect(component.emailModal()).toBe(true);
    expect(component.otpModal()).toBe(false);
  });

  it('should show otp modal', () => {
    component.showOtpModal();
    expect(component.otpModal()).toBe(true);
    expect(component.emailModal()).toBe(false);
  });

  it('should hide otp modal', () => {
    component.otpModal.set(true);
    component.hideOtpModal();
    expect(component.otpModal()).toBe(false);
  });

  it('should set breadcrumb', () => {
    component.setBreadcrumb();
    expect(breadcrumbServiceMock.setItems).toHaveBeenCalledWith([
      {
        label: 'Account',
        url: '/account/profile',
      },
    ]);
  });

  it('should get profile data', () => {
    component.getProfile();
    expect(accountServiceMock.getProfile).toHaveBeenCalled();
    expect(component.username()).toBe('alex123');
    expect(component.email()).toBe('alex@gmail.com');
    expect(component.profileForm.get('firstName')?.value).toBe('Alex');
    expect(component.profileForm.get('lastName')?.value).toBe('Max');
    expect(component.profileForm.get('phone')?.value).toBe('01012345678');
  });

  it('should set new profile data', () => {
    component.profileForm.patchValue({
      firstName: 'ahmed',
      lastName: 'ali',
      phone: '01210567389',
    });
    component.setNewprofile();
    expect(accountServiceMock.setNewProfile).toHaveBeenCalledWith({
      firstName: 'ahmed',
      lastName: 'ali',
      profilePhoto: '',
      phone: '01210567389',
    });
  });

  it('should send new email when email is valid', () => {
    component.emailControl.setValue('alex@gmail.com');
    const otpSpy = vi.spyOn(component, 'showOtpModal');
    component.sendNewEmail();
    expect(accountServiceMock.sendNewEmail).toHaveBeenCalledWith({
      newEmail: 'alex@gmail.com',
    });
    expect(otpSpy).toHaveBeenCalled();
  });

  it('should not send new email when email is invalid', () => {
    component.emailControl.setValue('alex123');
    component.sendNewEmail();
    expect(accountServiceMock.sendNewEmail).not.toHaveBeenCalled();
  });

  it('should confirm new email', () => {
    component.otpControl.setValue('123456');
    component.confirmEmail();
    expect(accountServiceMock.confirmEmail).toHaveBeenCalledWith({
      code: '123456',
    });
    expect(localStorage.getItem('email')).toBe('alex@gmail.com');
    expect(component.otpModal()).toBe(false);
  });

  it('should delete account', () => {
    localStorage.setItem('email', 'alex@gmail.com');
    component.deleteAccount();
    expect(accountServiceMock.deleteAccount).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.length).toBe(0);
  });

  //Template

  it('should render first name input', () => {
    fixture.detectChanges();
    const firstNameInput = fixture.debugElement.query(By.css('#firstname'));
    expect(firstNameInput).toBeTruthy();
    expect(firstNameInput.componentInstance.type()).toBe('text');
    expect(firstNameInput.componentInstance.label()).toBe('Firstname');
    expect(firstNameInput.componentInstance.control()).toBe(component.firstnameControl);
  });

  it('should render last name input', () => {
    fixture.detectChanges();
    const lastNameInput = fixture.debugElement.query(By.css('#lastname'));
    expect(lastNameInput).toBeTruthy();
    expect(lastNameInput.componentInstance.type()).toBe('text');
    expect(lastNameInput.componentInstance.label()).toBe('Lastname');
    expect(lastNameInput.componentInstance.control()).toBe(component.lastnameControl);
  });

  it('should render user name input', () => {
    fixture.detectChanges();
    const userNameInput = fixture.debugElement.query(By.css('#username'));
    expect(userNameInput).toBeTruthy();
    expect(userNameInput.attributes['type']).toBe('text');
    expect(userNameInput.properties['value']).toBe(component.username());
  });

  it('should render email input', () => {
    fixture.detectChanges();
    const emailInput = fixture.debugElement.query(By.css('#email'));
    expect(emailInput).toBeTruthy();
    expect(emailInput.attributes['type']).toBe('text');
    expect(emailInput.properties['value']).toBe(component.email());
  });

  it('should show email modal when email button is clicked', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.change-email'));
    button.triggerEventHandler('click');
    expect(component.emailModal()).toBe(true);
    expect(component.otpModal()).toBe(false);
  });

  it('should render phone input', () => {
    fixture.detectChanges();
    const phoneInput = fixture.debugElement.query(By.css('#phone'));
    expect(phoneInput).toBeTruthy();
    expect(phoneInput.componentInstance.type()).toBe('tel');
    expect(phoneInput.componentInstance.label()).toBe('Phone');
    expect(phoneInput.componentInstance.control()).toBe(component.phoneControl);
  });

  it('should show otp modal when email is sent', () => {
    component.emailControl.setValue('alex@gmail.com');
    component.sendNewEmail();
    fixture.detectChanges();
    expect(component.otpModal()).toBe(true);
    expect(component.emailModal()).toBe(false);
  });

  it('should show error banner when firstName is touched and required', () => {
    component.firstnameControl.setValue('');
    component.firstnameControl.markAsTouched();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('app-error-banner'));
    expect(error).toBeTruthy();
  });

  it('should call deleteAccount when delete button is clicked', () => {
  const spy = vi.spyOn(component, 'deleteAccount');
  fixture.detectChanges();
  const button = fixture.debugElement.query(By.css('.delete'));
  button.triggerEventHandler('click');
  expect(spy).toHaveBeenCalled();
});

  it('should call setNewprofile when save button is clicked', () => {
    const spy = vi.spyOn(component, 'setNewprofile');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.save'));
    button.triggerEventHandler('click');
    expect(spy).toHaveBeenCalled();
  });
});
