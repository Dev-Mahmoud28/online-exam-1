import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';
import { StepperComponent } from '../stepper/stepper.component';
import { RegisterFormService } from '../../services/register-form.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [InputComponent,ButtonComponent,ErrorBannerComponent,StepperComponent, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private router = inject(Router);
  private _registerFormService= inject(RegisterFormService);
  registerForm:FormGroup = this._registerFormService.registerForm

   get firstNameControl(){
    return this.registerForm.get("firstName") as FormControl
  }
  get lastNameControl(){
    return this.registerForm.get("lastName") as FormControl
  }
  get userNameControl(){
    return this.registerForm.get("username") as FormControl
  }
  get phoneControl(){
    return this.registerForm.get("phone") as FormControl
  }

  submitForm(){
    if(this.registerForm.controls["firstName"].valid && this.registerForm.controls["lastName"].valid && this.registerForm.controls["username"].valid && this.registerForm.controls["phone"].valid){
      this.router.navigate(['/register/create-password']);
    }
  }
}
