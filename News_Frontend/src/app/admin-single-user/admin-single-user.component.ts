import {Component, inject} from '@angular/core';
import { ApiDataService } from '../api-data.service';
import {publisher, user} from '../interfaces';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-single-user',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './admin-single-user.component.html',
  styleUrl: './admin-single-user.component.css'
})
export class AdminSingleUserComponent {
  user : any;
  author : any;
  publisher: any;
  u_id : number;
  userNews : any[] = [];
  ApiDataService = inject(ApiDataService);

  constructor(private route: ActivatedRoute, private router: Router) {
    this.u_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getUser(this.u_id).then((user : any) => {
      this.user = user;
      //console.log(user);
      if (user.is_author) {
        this.ApiDataService.getAuthor(this.u_id).then((author : any) => {
          this.author = author;
          this.ApiDataService.getAuthorNews(this.author.id).then((userNews: any[]) => {
            this.userNews = userNews;
            //console.log(userNews);
          });
          this.ApiDataService.getPublisher(this.author.id).then((publisher: any) => {
            this.publisher = publisher;
            //console.log(publisher);
          } );
        });
      }
    });

  }

  viewNewsDetails(id: number) {
    this.router.navigate(['admin/new', id]);
  }

  deleteNews(id: number) {
    this.ApiDataService.deleteNew(id).then((response : any) => {
      this.ApiDataService.getAuthorNews(this.author.id).then((userNews: any[]) => {
        this.userNews = userNews;
        //console.log(userNews);
      });
    });
  }
}
