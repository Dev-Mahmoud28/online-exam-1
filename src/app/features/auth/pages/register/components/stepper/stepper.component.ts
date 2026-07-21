import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
   private router = inject(Router);

  isEmail:boolean = false;
  currentStep = input.required<number>();
  isEmailPage(){
    if(this.router.url.includes("email")){
      this.isEmail= true;
    }
  }
  

  ngOnInit(): void {
    this.isEmailPage();
  }
}
