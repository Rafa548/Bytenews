import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor} from '@angular/common';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent , NgFor, CommonModule, NavbarAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {
  }


  redirectTo(path: string): void {
    switch (path) {
      case 'news':
        this.router.navigate(['/admin/news']); // Change the route path as needed
        break;
      case 'users':
        this.router.navigate(['/admin/users']); // Change the route path as needed
        break;
      case 'interests':
        this.router.navigate(['/admin/interests']); // Change the route path as needed
        break;
      default:
        break;
    }
  }

}
