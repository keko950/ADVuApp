import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard';
import { GetTokenComponent } from './dashboard/get-token/get-token.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { IndexComponent } from './dashboard/index/index.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'getToken', component: GetTokenComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', component: IndexComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);