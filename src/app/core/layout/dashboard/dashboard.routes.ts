import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home" 
        ,loadComponent:()=>import("../../../features/home/home.component").then(c=>c.HomeComponent)
        ,loadChildren:()=>import("../../../features/home/home.routes").then(c=>c.homeRoutes)
    },
    {path:"account",
    loadComponent:()=>import("../../../features/account-settings/account-settings.component").then(c=>c.AccountSettingsComponent),
    loadChildren:()=>import('../../../features/account-settings/account.routes').then(c=>c.accountRoutes)
    },
]