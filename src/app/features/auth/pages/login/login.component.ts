import { Component, DestroyRef, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/business/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorBannerComponent } from '../../../../shared/components/ui/error-banner/error-banner.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../dist/auth';
import { isPlatformBrowser } from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputComponent, ErrorBannerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login{
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private _authService = inject(AuthService);
  private destroyRef = inject(DestroyRef)

  loginForm:FormGroup = new FormGroup({
    username: new FormControl("",{validators:Validators.required}),
    password: new FormControl("",{validators:[Validators.required]}),
  });

  get userNameControl(){
    return this.loginForm.get("username") as FormControl;
  }
  get passwordControl(){
    return this.loginForm.get("password") as FormControl;
  }

  submitForm(){
    this._authService.login(this.loginForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        if(isPlatformBrowser(this.platformId)){
          localStorage.setItem("token", res.token);
        }
        this.router.navigate(['/home']);
      }
    });
  } 
}
