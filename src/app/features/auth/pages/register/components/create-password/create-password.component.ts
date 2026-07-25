import { AuthService } from './../../../../../../../../dist/auth';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';
import { StepperComponent } from '../stepper/stepper.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormService } from '../../services/register-form.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-password',
  imports: [InputComponent, ButtonComponent, ErrorBannerComponent, StepperComponent, ReactiveFormsModule],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css',
})
export class CreatePasswordComponent implements OnDestroy{
  private platformId = inject(PLATFORM_ID);
  private _registerFormService = inject(RegisterFormService);
  private _authService = inject(AuthService);
  private router = inject(Router);
  sub = signal<Subscription>(new Subscription());
  registerForm:FormGroup = this._registerFormService.registerForm;

  get passwordControl(){
    return this.registerForm.get("password") as FormControl
  }
  get rePasswordControl(){
    return this.registerForm.get("confirmPassword") as FormControl
  }

 getEmail(){
    if(isPlatformBrowser(this.platformId)){
      this.registerForm.value.email = localStorage.getItem("email");
    }
 }
  sendForm(){
    this.getEmail();
    if(!this.registerForm.errors){
     this.sub.set(this._authService.register(this.registerForm.value).subscribe({
        next:(res)=>{
          toast.success("Your Account Has Been Created Successfylly");
          this.router.navigate(["./login"]);
        },
      }));
    }
  }

  ngOnDestroy(): void {
    this.sub().unsubscribe();
  }

}
