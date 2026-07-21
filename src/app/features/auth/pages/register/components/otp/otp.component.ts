import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StepperComponent } from '../stepper/stepper.component';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-otp',
  imports: [RouterLink, StepperComponent, ButtonComponent, InputOtpModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
   private platformId = inject(PLATFORM_ID)
  private router = inject(Router)
  value = signal<any>('');
  valueLength = computed(()=> this.value().toString().length);
  sentEmail = signal<string>('');

  printValue(){
      console.log(this.value());
      this.router.navigate(['/register/about']);
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
