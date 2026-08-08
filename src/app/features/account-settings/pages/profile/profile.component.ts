import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { InputComponent } from '../../../../shared/components/business/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { AccountService } from '../../services/account/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toast } from 'ngx-sonner';
import { DialogModule } from 'primeng/dialog';
import { InputOtp } from 'primeng/inputotp';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-profile',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    DialogModule,
    InputOtp,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private _accountService = inject(AccountService);
  private _breadcrumbService = inject(BreadcrumbService);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  emailModal = signal<boolean>(false);
  otpModal = signal<boolean>(false);
  username = signal<string>('');
  email = signal<string>('');
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', Validators.email),
    otp: new FormControl(''),
  });

  get firstnameControl() {
    return this.profileForm.get('firstName') as FormControl;
  }
  get lastnameControl() {
    return this.profileForm.get('lastName') as FormControl;
  }
  get phoneControl() {
    return this.profileForm.get('phone') as FormControl;
  }
  get emailControl() {
    return this.profileForm.get('email') as FormControl;
  }

  setBreadcrumb(){
    this._breadcrumbService.setItems([{label:'Account', url:'/account/profile'}])
  }

  getProfile() {
    return this._accountService
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ payload }) => {
          this.username.set(payload.user.username);
          this.email.set(payload.user.email);
          this.profileForm.patchValue({
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            phone: payload.user.phone,
          });
        },
      });
  }

  setNewprofile() {
    const data = {
      firstName: this.firstnameControl.value,
      lastName: this.lastnameControl.value,
      profilePhoto: '',
      phone: this.phoneControl.value,
    };

    this._accountService
      .setNewProfile(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          toast.success('Your data has been updated successfully');
        }
      });
  }

  sendNewEmail() {
    const data ={
      newEmail: this.emailControl.value
    }
    if(!this.emailControl.getError('email')){
      this._accountService.sendNewEmail(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next:(res)=>{
          toast.success(res.message);
          this.showOtpModal();
        }
      })
    }
  }

  confirmEmail() {
    const data = {
      code: this.profileForm.get('otp')?.value,
    };
    this._accountService
      .confirmEmail(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ payload }) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('email', payload.user.email);
          }
          this.hideOtpModal();
          toast.success('Your email updated successfully');
        },
      });
  }

  showEmailModal() {
    this.emailModal.set(true);
    this.otpModal.set(false);
  }

  showOtpModal() {
    this.otpModal.set(true);
    this.emailModal.set(false);
  }

  hideOtpModal() {
    this.otpModal.set(false);
  }

  deleteAccount(){
    this._accountService.deleteAccount().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:({message})=>{
        this.router.navigate(['/login']);
        if(isPlatformBrowser(this.platformId)){
          localStorage.clear()
        }
        toast.success(message);
      }
    })
  }

  ngOnInit(): void {
    this.getProfile();
    this.setBreadcrumb();
  }
}
