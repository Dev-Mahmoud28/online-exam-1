import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  if(isPlatformBrowser(platformId)){
    const token = localStorage.getItem("token");
    if(token !== null){
      return true;
    }
  }
  router.navigate(["/login"]);
  return false
};
