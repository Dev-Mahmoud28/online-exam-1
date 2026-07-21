import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RegisterFormService } from '../../services/register-form.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email',
  imports: [ReactiveFormsModule, InputComponent, ErrorBannerComponent, ButtonComponent, RouterLink],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailComponent {
  private platformId = inject(PLATFORM_ID);
  private _registerFormService = inject(RegisterFormService);
  registerForm:FormGroup = this._registerFormService.registerForm;

    get emailControl(){
    return this.registerForm.get("email") as FormControl;
  }

  sendEmail(){
    if(this.registerForm.get("email")?.valid){
      if(isPlatformBrowser(this.platformId)){
        localStorage.setItem("email", this._registerFormService.registerForm.controls["email"].value!);
      }
      console.log(this.registerForm)
    }
  }
}
