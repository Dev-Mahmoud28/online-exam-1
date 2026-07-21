import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/business/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorBannerComponent } from '../../../../shared/components/ui/error-banner/error-banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputComponent,ErrorBannerComponent,ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {

loginForm:FormGroup = new FormGroup({
    userName: new FormControl("",{validators:Validators.required}),
    password: new FormControl("",{validators:[Validators.required]}),
  });

  get userNameControl(){
    return this.loginForm.get("userName") as FormControl;
  }
  get passwordControl(){
    return this.loginForm.get("password") as FormControl;
  }

  submitForm(){
    console.log(this.loginForm)
  }  
}
