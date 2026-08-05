import { Routes } from '@angular/router';
import { loggedInGuard } from './core/guards/auth/loggedIn/logged-in-guard';
import { loggedOutGuard } from './core/guards/auth/loggedOut/logged-out-guard';

export const routes: Routes = [
    {path:"", loadComponent:()=>import('./features/auth/auth.component').then(c=>c.Auth),
        loadChildren:()=>import('./features/auth/auth.routes').then(c=>c.authRoutes),
        canActivate:[loggedOutGuard]
    },
    {path:""
        ,loadComponent:()=>import("./core/layout/dashboard/dashboard.component").then(c=>c.DashboardComponent)
        ,loadChildren:()=>import("./core/layout/dashboard/dashboard.routes").then(c=>c.dashboardRoutes)
        // ,canActivate:[loggedInGuard]
    }
];
