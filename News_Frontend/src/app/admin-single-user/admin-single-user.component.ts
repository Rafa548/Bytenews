import {Component, inject} from '@angular/core';
import { ApiDataService } from '../api-data.service';
import {publisher, user} from '../interfaces';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';


@Component({
  selector: 'app-admin-single-user',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NavbarComponent,
    FormsModule,
    NavbarAdminComponent
  ],
  templateUrl: './admin-single-user.component.html',
  styleUrl: './admin-single-user.component.css'
})
export class AdminSingleUserComponent {
  user : any;
  username : string = "Username";
  email : string = "Email";
  author : any;
  publisher: any;
  publishers : publisher[] = [];
  selectedPublisher : number = 0;
  u_id : number;
  userSavedNews : any[] = [];
  userPublishedNews : any[] = [];

  ApiDataService = inject(ApiDataService);
  activeTab: string = 'saved-news'
  isAuthor : boolean = false;

  toggleView() {
    this.isAuthor = !this.isAuthor;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.u_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getUser(this.u_id).then((user : user) => {
      this.ApiDataService.getPublishers().then((publishers : any[]) => {
        this.publishers = publishers;
        this.selectedPublisher = publishers[0].id;
        //console.log(publishers);
        //console.log(typeof this.selectedPublisher);
      });
      this.user = user;
      this.username = user.username;
      this.email = user.email;
      //console.log(user);
      this.ApiDataService.getNewsByUser(this.u_id).then((userNews: any[]) => {
        this.userSavedNews = userNews;
        //console.log(userNews);
      } );
      if (user.is_author) {
        this.isAuthor = true;
        this.ApiDataService.getAuthor(this.u_id).then((author : any) => {
          this.author = author;
          //console.log(author);
          this.ApiDataService.getAuthorNews(this.author.id).then((userNews: any[]) => {
            this.userPublishedNews = userNews;
            //console.log(userNews);
          });
          //console.log(this.author.id);
          //console.log(this.author.publisher);
          this.ApiDataService.getPublisher(this.author.publisher).then((publisher: any) => {
            this.publisher = publisher;
            this.selectedPublisher = publisher.id;
            console.log(publisher);
          });
        });
      }
    });

  }

  viewNewsDetails(id: number) {
    this.router.navigate(['admin/new', id]);
  }

  deleteSavedNews(id: number) {
    this.ApiDataService.deleteNew(id).then((response : any) => {
      this.ApiDataService.getAuthorNews(this.author.id).then((userNews: any[]) => {
        this.userSavedNews = userNews;
        //console.log(userNews);
      });
    });
  }

  deletePublishedNews(id: number) {
    this.ApiDataService.deleteNew(id).then((response : any) => {
      this.ApiDataService.getAuthorNews(this.author.id).then((userNews: any[]) => {
        this.userPublishedNews = userNews;
        //console.log(userNews);
      });
    });
  }

  Save() {
    if (this.isAuthor) {
      if (this.author != undefined) {
        const publisher_id = Number(this.selectedPublisher);
        this.author.publisher = publisher_id;
        this.ApiDataService.updateAuthor(this.author).then((response : any) => {
          console.log(response);
        } );}
      else {
        const publisher_id = Number(this.selectedPublisher);
        this.author = {
          user: this.user.id,
          publisher: publisher_id
        }
        this.ApiDataService.createAuthor(this.author).then((response : any) => {
         //console.log(response);
        });
        this.user.is_author = true;
        this.ApiDataService.updateUser(this.user).then((response : any) => {
          console.log(response);
        });

      }
    }
    else {
      this.user.is_author = false;
      this.ApiDataService.updateUser(this.user).then((response : any) => {
        //console.log(response);
      });
      //meter delete de author
    }
  }
}

