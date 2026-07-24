import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StepperComponent } from '../stepper/stepper.component';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { AuthService } from '../../../../../../../../dist/auth';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-otp',
  imports: [RouterLink, StepperComponent, ButtonComponent, InputOtpModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  private _authService = inject(AuthService)
  private platformId = inject(PLATFORM_ID)
  private router = inject(Router)
  value = signal<any>('');
  valueLength = computed(()=> this.value().toString().length);
  sentEmail = signal<string>('');

  printValue(){
      const code = {
        email:this.sentEmail(),
        code:this.value()
      }
      if(this.valueLength() == 6){
        this._authService.confirmEmail(code).subscribe({
          next:()=>{
            this.router.navigate(['/register/about']);
            toast.success("Your email is verified successfully");
          }
        })
      }
  }
  showEmail(){
    if(isPlatformBrowser(this.platformId)){
      this.sentEmail.set(localStorage.getItem("email") !);
    }
  }
  ngOnInit(): void {
    this.showEmail();
  }
}
