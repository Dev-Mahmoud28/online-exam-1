import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  if(isPlatformBrowser(platformId)){
    const token = localStorage.getItem("token");
    if(token !== null){
      router.navigate(["/home"]);
      return false;
    }
  }
    return true
};
