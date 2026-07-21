import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassword } from '../../../../../../shared/utils/confirm-password';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, ErrorBannerComponent, RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
   passwordForm:FormGroup = new FormGroup({
    password: new FormControl("", {validators:[Validators.required]}),
    rePassword: new FormControl("", {validators:[Validators.required]})
  }, confirmPassword);

  get passwordControl(){
    return this.passwordForm.get("password") as FormControl;
  }
  get rePasswordControl(){
    return this.passwordForm.get("rePassword") as FormControl;
  }
}
