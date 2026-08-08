import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router) 

  isClicked = signal<boolean>(false);

  toggle(){
    this.isClicked.update(v => !v);
  }

  logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
  }

  get userEmail(){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('email');
    }
    return ''
  }

  get firstname(){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('firstname');
    }
    return ''
  }
}
