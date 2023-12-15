import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiDataService} from "../api-data.service";
import {author, news, publisher} from "../interfaces";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-single-news',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './admin-single-news.component.html',
  styleUrl: './admin-single-news.component.css'
})
export class AdminSingleNewsComponent {
  ApiDataService = inject(ApiDataService);
  newsArticle: any;
  newsID: number;
  u_name : string = "";
  p_id : number = 0;
  p_name : string = "";
  editMode = false;


  constructor(private route: ActivatedRoute) {
    this.newsID = Number(this.route.snapshot.paramMap.get('id'));
    //console.log(this.newsID);
    this.ApiDataService.getNew(this.newsID).then((news : any) => {
      //console.log(news);
      this.newsArticle = news;

      this.ApiDataService.getAuthor(this.newsArticle.published_by).then((author : author) => {
        //console.log(author);
        this.p_id = author.publisher;
        this.ApiDataService.getPublisher(this.p_id).then((publisher : publisher) => {
          this.p_name = publisher.name;
        });
        this.ApiDataService.getUser(this.newsArticle.published_by).then((user : any) => {
          //console.log(user);
          this.u_name = user.username;
        } );
      });


    });

  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.editMode = false; // After saving, exit edit mode
    //console.log(this.newsArticle);
    this.ApiDataService.updateNew(this.newsArticle).then((news : any) => {
      //console.log(news);
      this.newsArticle = news;
    });
  }

}
