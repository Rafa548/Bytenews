import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {author, user} from "../interfaces";
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-admin-single-publisher',
  standalone: true,
    imports: [
        NavbarComponent,
        NgForOf
    ],
  templateUrl: './admin-single-publisher.component.html',
  styleUrl: './admin-single-publisher.component.css'
})
export class AdminSinglePublisherComponent {
  publisher_name : string = "Publisher Name";
  p_id : number ;
  authors : author[] = [];
  users : user[] = [];
  ApiDataService = inject(ApiDataService);
  constructor(private router: Router) {
    this.p_id = Number(this.router.url.split("/")[3]);
    console.log(this.p_id)
    this.ApiDataService.getPublisher(this.p_id).then((publisher : any) => {
      this.publisher_name = publisher.name;
      this.ApiDataService.getPublisherAuthors(this.p_id).then((authors : any[]) => {
        this.authors = authors;
        //console.log(authors);
        for (let author of authors) {
          this.ApiDataService.getUser(author.user).then((user : any) => {
            this.users.push(user);
            //console.log(author);
          });
        }
      });
    });
  }

  viewUserDetails(userId: number) {
    this.router.navigate(['admin/users', userId]); // Navigate to a route like '/user/1' based on the user ID
  }

  deleteUser(userId: number) {
    this.ApiDataService.deleteUser(userId).then((response: any) => {
      this.ApiDataService.getPublisherAuthors(this.p_id).then((authors: any[]) => {
        this.authors = authors;
        //console.log(authors);
        for (let author of authors) {
          this.ApiDataService.getUser(author.user).then((user: any) => {
            author.user = user;
            //console.log(author);
          });
        }
      });
    });
  }
}
