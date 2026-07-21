import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, input, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms"
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements AfterViewInit{
    private platformId = inject(PLATFORM_ID);
    label = input.required<string>();
    type = input<"text" | "email" | "password" | "number" | "tel">("text");
    placeholder = input<string>("");
    control = input.required<FormControl>();
    id = input.required<string>();
    showPassword = signal<boolean>(false);


    @ViewChild('input') phoneInput!: ElementRef<HTMLInputElement>;

    toggleType(){
      if(!this.showPassword()){
        this.phoneInput.nativeElement.type = "text"
        this.showPassword.set(true);
      }else{
        this.phoneInput.nativeElement.type = "password"
        this.showPassword.set(false);
      }
    }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)){
      if(this.type() === "tel"){
        intlTelInput(this.phoneInput.nativeElement, {
          initialCountry: 'eg',
          separateDialCode: true,
          strictMode: true,
          containerClass: "w-full"
        });
      }
    }
  }
  
}
