import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { AccountService } from '../../services/account/account.service';
import { confirmPassword } from '../../../../shared/utils/confirm-password';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toast } from 'ngx-sonner';
import { ErrorBannerComponent } from "../../../../shared/components/ui/error-banner/error-banner.component";
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, ErrorBannerComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit{
  private _accountService = inject(AccountService);
  private _breadcrumbService = inject(BreadcrumbService)
  private destroyRef = inject(DestroyRef)

  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  },confirmPassword);

  get currentPassword() {
    return this.passwordForm.get('currentPassword') as FormControl;
  }
  get newPassword() {
    return this.passwordForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }

  setBreadcrumb(){
    this._breadcrumbService.setItems([{label:'Account', url:'/account/profile'}, {label:'Change Password', url:'/account/change-password'}]);
  }

  changePassword() {
    const data = {
      currentPassword: this.currentPassword.value,
      newPassword: this.newPassword.value,
      confirmPassword: this.confirmPassword.value,
    };
    this._accountService.changePassword(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        toast.success(res.message);
      }
    });
  }

  ngOnInit(): void {
    this.setBreadcrumb();
  }
}
