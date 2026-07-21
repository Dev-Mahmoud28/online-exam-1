import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../../../../shared/components/business/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { ErrorBannerComponent } from '../../../../../../shared/components/ui/error-banner/error-banner.component';

@Component({
  selector: 'app-recovery-email',
  imports: [InputComponent, ButtonComponent,ErrorBannerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery-email.component.html',
  styleUrl: './recovery-email.component.css',
})
export class RecoveryEmailComponent {
   private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  emailForm:FormGroup = new FormGroup({
    email: new FormControl("",{validators:[Validators.required, Validators.email]})
  });

  get emailControl(){
    return this.emailForm.get("email") as FormControl
  }

  submitEmail(){
      console.log(this.emailForm);
      if(isPlatformBrowser(this.platformId)){
        localStorage.setItem("email", this.emailControl.value);
      }
      this.router.navigate(['/forgetPassword/resetPage']);
  }
}
