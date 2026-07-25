import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPassword } from '../../../../../shared/utils/confirm-password';
import { passwordValidation } from '../../../../../shared/utils/password-validation';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  registerForm = new FormGroup({
    email: new FormControl("", {validators:[Validators.required, Validators.email]}),
    firstName: new FormControl("", {validators:[Validators.required]}),
    lastName: new FormControl("", {validators:[Validators.required]}),
    username: new FormControl("", {validators:[Validators.required]}),
    phone: new FormControl("", {validators:[Validators.required]}),
    password: new FormControl("", {validators:[Validators.required, Validators.pattern(passwordValidation)]}),
    confirmPassword: new FormControl("", {validators:[Validators.required]}),
  }, {validators:[confirmPassword]});
}
