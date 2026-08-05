import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {path:"", redirectTo:"diplomas", pathMatch:"full"},
    {path:"diplomas", loadComponent:()=>import("./pages/diplomas/diplomas.component").then(c=>c.DiplomasComponent), title:"Diplomas"},
    {path:"exams/:id", loadComponent:()=>import("./pages/exams/exams.component").then(c=>c.ExamsComponent), title:"Exams"},
    {path:"questions/:id", loadComponent:()=>import("./pages/questions/questions.component").then(c=>c.QuestionsComponent),title:"Questions"},
    {path:"result/:id", loadComponent:()=>import("./pages/result/result.component").then(c=>c.ResultComponent), title:"Result"},
]