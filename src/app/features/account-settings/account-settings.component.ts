import { Component, inject, PLATFORM_ID } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/ui/page-title/page-title.component";
import { BackButtonComponent } from "../../shared/components/business/back-button/back-button.component";
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  imports: [PageTitleComponent, BackButtonComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  
 logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
  }
}
