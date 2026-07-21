import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"", loadComponent:()=>import('./features/auth/auth.component').then(c=>c.Auth),
        loadChildren:()=>import('./features/auth/auth.routes').then(c=>c.authRoutes)}
];
