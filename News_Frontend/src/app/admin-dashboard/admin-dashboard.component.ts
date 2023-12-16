import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor} from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent , NgFor, CommonModule],
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
      case 'teachers':
        this.router.navigate(['/admin/teachers']); // Change the route path as needed
        break;
      default:
        break;
    }
  }

}
