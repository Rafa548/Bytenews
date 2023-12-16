import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminAllNewsComponent} from "./admin-all-news/admin-all-news.component";
import {AdminSingleNewsComponent} from "./admin-single-news/admin-single-news.component";
import {AdminAllUsersComponent} from "./admin-all-users/admin-all-users.component";
import {AdminSingleUserComponent} from "./admin-single-user/admin-single-user.component";
import {AdminAuthGuard} from "./admin-auth.guard";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/news', component: AdminAllNewsComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/new/:id', component: AdminSingleNewsComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/users', component: AdminAllUsersComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/users/:id', component: AdminSingleUserComponent,canActivate: [AdminAuthGuard]},
    { path: 'unauthorized', component: UnauthorizedComponent},

];
