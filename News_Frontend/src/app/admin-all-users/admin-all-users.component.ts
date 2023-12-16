import {Component, inject} from '@angular/core';
import {user} from "../interfaces";
import {ApiDataService} from "../api-data.service";
import {Router} from "@angular/router";
import {CardComponent} from "../card/card.component";
import {NgForOf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {AdminAllDetailsPageComponent} from "../admin-all-details-page/admin-all-details-page.component";

@Component({
  selector: 'app-admin-all-users',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NavbarComponent,
    AdminAllDetailsPageComponent
  ],
  templateUrl: './admin-all-users.component.html',
  styleUrl: './admin-all-users.component.css'
})
export class AdminAllUsersComponent {
  users: user[] = [];
  ApiDataService = inject(ApiDataService);

  constructor(private router: Router) {
    this.ApiDataService.getUsers().then((users: user[]) => {
      this.users = users;
    });
  }

  navigateToUserDetails(userId: number) {
    this.router.navigate(['admin/users', userId]); // Navigate to a route like '/user/1' based on the user ID
  }

  scrollToBottom() {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
  }

  deleteUser(userId: number) {
    this.ApiDataService.deleteUser(userId).then((response: any) => {
      this.ApiDataService.getUsers().then((users: user[]) => {
        this.users = users;
      });
    });
  }

}
