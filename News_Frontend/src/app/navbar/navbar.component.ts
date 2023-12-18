import { NgIf } from '@angular/common';
import { Component , inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showDropdown: boolean = false;
  showNotifications = false;
  AuthService = inject(AuthService);
  currentUser = this.AuthService.getUser();
  isLoggedIn: boolean = this.currentUser;
  

  toggleNotifications(event: Event) {
    event.stopPropagation(); // Prevent default event behavior to avoid toggling dropdown and closing it immediately
    this.showNotifications = !this.showNotifications;
  }
  constructor(private router: Router) {
    console.log(this.currentUser);
  }

  login() {
    // Implement your login logic here
    // For example, navigate to the login page
    this.router.navigate(['/']);
  }

  logout() {
    // Implement your logout logic here
    // For example, clear the token and navigate to the home page
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  redirectTo(path: string): void {
    switch (path) {
      case 'saved':
        this.router.navigate(['/user/' + this.currentUser.id + '/saved']); // Change the route path as needed
        break;
      case 'all':
        this.router.navigate(['/user/dashboard']); // Change the route path as needed
        break;
      case 'teachers':
        this.router.navigate(['/admin/teachers']); // Change the route path as needed
        break;
      default:
        break;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
