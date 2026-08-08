import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
    {path:'', redirectTo:'profile', pathMatch:'full'},
    {path:'profile', loadComponent:()=>import('./pages/profile/profile.component').then(c => c.ProfileComponent)},
    {path:'change-password', loadComponent:()=>import('./pages/change-password/change-password.component').then(c => c.ChangePasswordComponent)}
]