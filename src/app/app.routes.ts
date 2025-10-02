import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'cadastro', component: RegisterComponent},
    { path: 'termos', component: TermsOfServiceComponent},
    { path: 'privacidade', component: PrivacyPolicyComponent},
    { path: 'novo-projeto', component: CreateProjectComponent, canActivate:[authGuard]},

    { path: 'projeto/:id', component: ProjectDetailComponent},
    { path: '**', redirectTo: '', pathMatch:'full'}
];
