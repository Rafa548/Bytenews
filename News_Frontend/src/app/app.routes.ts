import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminAllNewsComponent} from "./admin-all-news/admin-all-news.component";
import {AdminSingleNewsComponent} from "./admin-single-news/admin-single-news.component";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {AdminAllUsersComponent} from "./admin-all-users/admin-all-users.component";
import {AdminSingleUserComponent} from "./admin-single-user/admin-single-user.component";
import {AdminAuthGuard} from "./admin-auth.guard";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {RegisterComponent} from "./register/register.component";
import { UserSavedNewsComponent } from './user-saved-news/user-saved-news.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { AuthorNewsComponent } from './author-news/author-news.component';
import { NewsInterestComponent } from './news-interest/news-interest.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import {AdminAllInterestsComponent} from "./admin-all-interests/admin-all-interests.component";
import {AdminSingleInterestComponent} from "./admin-single-interest/admin-single-interest.component";
import {AdminAllPublishersComponent} from "./admin-all-publishers/admin-all-publishers.component";
import {AdminSinglePublisherComponent} from "./admin-single-publisher/admin-single-publisher.component";
import { PublisherPageComponent } from './publisher-page/publisher-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },


    { path: 'user/dashboard', component: UserDashboardComponent},
    { path: 'user/:id/saved', component: UserSavedNewsComponent},
    { path: 'author/:id', component: AuthorNewsComponent},
    { path: 'news/:id', component: NewsPageComponent},
    { path: 'news/interest/:id', component: NewsInterestComponent},
    { path: 'author/:id/profile', component: AuthorProfileComponent},
    { path: 'publisher/:id', component: PublisherPageComponent},



    { path: 'admin/dashboard', component: AdminDashboardComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/news', component: AdminAllNewsComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/new/:id', component: AdminSingleNewsComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/users', component: AdminAllUsersComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/users/:id', component: AdminSingleUserComponent,canActivate: [AdminAuthGuard]},
    { path: 'admin/interests', component: AdminAllInterestsComponent,canActivate: [AdminAuthGuard] },
    { path: 'admin/interests/:id', component: AdminSingleInterestComponent,canActivate: [AdminAuthGuard]},
    { path: 'admin/publishers', component: AdminAllPublishersComponent, canActivate: [AdminAuthGuard]},
    { path: 'admin/publishers/:id', component: AdminSinglePublisherComponent, canActivate: [AdminAuthGuard]},
    { path: 'unauthorized', component: UnauthorizedComponent},

];
