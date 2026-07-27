import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from "../../shared/components/ui/button/button.component";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  
  signOut(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }
  }
}
