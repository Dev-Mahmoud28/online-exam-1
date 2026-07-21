import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {path:"", redirectTo:"login", pathMatch:"full"},
    {path:'login', loadComponent: ()=>import('./pages/login/login.component').then(c => c.Login), title:"Login"},
        {path:'register', loadComponent: ()=>import('./pages/register/register.component').then(c => c.Register), title:"Register", children:[
            {path:"", redirectTo:"email", pathMatch:"full"},
            {path:'email', loadComponent: ()=>import('./pages/register/components/email/email.component').then(c => c.EmailComponent), title:"Email"},
            {path:'about', loadComponent: ()=>import('./pages/register/components/about/about.component').then(c => c.AboutComponent), title:"About"},
            {path:'create-password', loadComponent: ()=>import('./pages/register/components/create-password/create-password.component').then(c => c.CreatePasswordComponent), title:"Create Password"},
            {path:'otp', loadComponent: ()=>import('./pages/register/components/otp/otp.component').then(c => c.OtpComponent), title:"OTP"},
        ]},
        {path:'forgetPassword',loadComponent: ()=>import('./pages/forget-password/forget-password.component').then(c => c.ForgetPassword), title:"Forget Password" , children:[
                {path:"", redirectTo:"recovery-email", pathMatch:"full"},
                {path:"recovery-email",loadComponent: ()=>import('./pages/forget-password/components/recovery-email/recovery-email.component').then(c => c.RecoveryEmailComponent), title:"Recovery Email"},
                {path:"reset-page",loadComponent: ()=>import('./pages/forget-password/components/reset-page/reset-page.component').then(c => c.ResetPageComponent), title:"Reset Page"},
                {path:"new-password", loadComponent: ()=>import('./pages/forget-password/components/new-password/new-password.component').then(c => c.NewPasswordComponent), title:"New Password"},
            ]},
]