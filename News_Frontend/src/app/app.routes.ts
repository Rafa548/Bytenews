import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminAllNewsComponent} from "./admin-all-news/admin-all-news.component";
import {AdminSingleNewsComponent} from "./admin-single-news/admin-single-news.component";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent },
    { path: 'admin/news', component: AdminAllNewsComponent },
    { path: 'admin/new/:id', component: AdminSingleNewsComponent }

];
