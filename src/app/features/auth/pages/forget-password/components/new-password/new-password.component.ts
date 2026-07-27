import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassword } from '../../../../../../shared/utils/confirm-password';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../../../dist/auth';
import { toast } from 'ngx-sonner';
import { passwordValidation } from '../../../../../../shared/utils/password-validation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, ErrorBannerComponent, RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit{

  private _authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef)
  token = signal<string>("");

  passwordForm:FormGroup = new FormGroup({
    password: new FormControl("", {validators:[Validators.required, Validators.pattern(passwordValidation)]}),
    confirmPassword: new FormControl("", {validators:[Validators.required]})
  }, confirmPassword);

  get passwordControl(){
    return this.passwordForm.get("password") as FormControl;
  }
  get confirmPasswordControl(){
    return this.passwordForm.get("confirmPassword") as FormControl;
  }

  getToken (){
    this.activatedRoute.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next:(param)=>{
          this.token.set(param.get("token")!)
        }
      })
  }

  submitForm(){
    const data = {
      newPassword: this.passwordControl.value,
      confirmPassword: this.confirmPasswordControl.value,
      token: this.token()
    }
    this._authService.resetPassword(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:()=>{
        this.router.navigate(["./login"]);
        toast.success("Your password has been updated")
      },
    });
  }

  ngOnInit(): void {
    this.getToken();
  }
}
