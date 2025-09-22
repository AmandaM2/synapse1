import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'novo-projeto', component: CreateProjectComponent},

    { path: '**', redirectTo: '', pathMatch:'full'}
];
