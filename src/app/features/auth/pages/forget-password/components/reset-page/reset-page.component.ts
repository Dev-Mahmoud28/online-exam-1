import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../../shared/components/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reset-page',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './reset-page.component.html',
  styleUrl: './reset-page.component.css',
})
export class ResetPageComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  sentEmail = signal<string>('');

  showEmail(){
    if(isPlatformBrowser(this.platformId)){
       this.sentEmail.set(localStorage.getItem("email")!);
    }
  }

  back(){
    this.router.navigate(['/forgetPassword/recoveryEmail'])
  }

  ngOnInit(): void {
    this.showEmail();
  }
}
