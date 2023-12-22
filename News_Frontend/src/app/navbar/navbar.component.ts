import {NgForOf, NgIf} from '@angular/common';
import { Component , inject,Input,OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../auth.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiDataService} from "../api-data.service";
import {author, news, publisher, user} from "../interfaces";



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLinkActive, RouterLink, NgForOf, ReactiveFormsModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  showDropdown: boolean = false;
  showNotifications = false;
  AuthService = inject(AuthService);
  currentUser = this.AuthService.getUser();
  isLoggedIn: boolean = this.currentUser;
  @Input() isAuthor: boolean = false;
  userId: string | undefined;
  newsTitle: string | undefined;
  newsDescription: string | undefined;
  newsContent: string | undefined;
  tags : any[] = [];
  all_dropdown_interests: any = [];
  selectedDropdownInterests: any[] = [];
  ApiDataService = inject(ApiDataService);
  all_interests: any = [];
  dropdownVisible = false;


  toggleNotifications(event: Event) {
    event.stopPropagation(); // Prevent default event behavior to avoid toggling dropdown and closing it immediately
    this.showNotifications = !this.showNotifications;
  }
  constructor(private router: Router) {
    console.log(this.currentUser);
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.userId = this.currentUser.id;
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
    this.AuthService.logout();
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

  toggleDropdownInterestSelection(interestId: number): void {
    if (this.isDropdownInterestSelected(interestId)) {
      this.selectedDropdownInterests = this.selectedDropdownInterests.filter(id => id !== interestId);
    } else {
      this.selectedDropdownInterests.push(interestId);
    }
  }

  isDropdownInterestSelected(interestId: number): boolean {
    return this.selectedDropdownInterests.includes(interestId);
  }

  toggleDropdown1(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  openmodal() {
    const modal = document.getElementById('createModal');
    this.ApiDataService.getInterests().then((interests : any) => {
      console.log(interests);
      this.all_interests = interests;
      this.all_dropdown_interests=interests;
    });
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveChanges () {
    console.log("guhuh");
    this.ApiDataService.getAuthorByUser(this.currentUser.id).then((author : author) => {
      console.log("author",author);
      console.log("author.id",author.id);
      console.log("tags",this.selectedDropdownInterests);
      const news = {
        "title": this.newsTitle,
        "description": this.newsDescription,
        "content": this.newsContent,
        "published_by":author.id,
        "tags":this.selectedDropdownInterests
      };
      this.ApiDataService.createNews(news).then(r => {
        console.log(r);
        this.closeCreateModal();
      });
    });
  }
}
