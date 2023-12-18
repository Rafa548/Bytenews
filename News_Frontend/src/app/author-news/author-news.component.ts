import {Component, inject} from '@angular/core';
import {NewsCardDarkComponent} from "../news-card-dark/news-card-dark.component";
import {NewsCardLightComponent} from "../news-card-light/news-card-light.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ApiDataService} from "../api-data.service";
import {AuthService} from "../auth.service";
import {author, news, publisher, user} from "../interfaces";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-author-news',
  standalone: true,
  imports: [
    NewsCardDarkComponent,
    NewsCardLightComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './author-news.component.html',
  styleUrl: './author-news.component.css'
})
export class AuthorNewsComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);
  newsArticles: any[] = [];
  selectedNews: any = null;
  authors: Map<number, string> = new Map<number, string>();
  author_data:any = {};
  newsTitle: string | undefined;
  newsDescription: string | undefined;
  newsContent: string | undefined;
  tags : any[] = [];

  constructor(private router: Router) {
    this.author_data = this.AuthService.getUser();
    console.log(this.author_data);
    this.ApiDataService.getAuthorNews(this.author_data.id).then((news1 : any) => {
      this.newsArticles = news1;
      console.log(this.newsArticles)
      for (let i = 0; i < this.newsArticles.length; i++) {
        const putblished = this.newsArticles[i].published_by;
        this.ApiDataService.getAuthor(putblished).then((author : author) => {
          //console.log(author);
          this.ApiDataService.getUser(author.user).then((user : user) => {
            //console.log(user);
            this.authors.set(this.newsArticles[i].id, user.username);
          });
        });
      }
    });
  }

  redirectAuthor(news : any) {
    this.selectedNews = news;
    const author_id = news.published_by;
    this.router.navigate(['/author', author_id]);

  }

  closeEditModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openmodal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }


  saveChanges () {
    console.log(this.author_data.id);
    console.log(this.author_data.id);
    this.ApiDataService.getAuthor(this.author_data.id).then((author : author) => {
      console.log(author);
      const news = {
        "title": this.newsTitle,
        "description": this.newsDescription,
        "content": this.newsContent,
        "published_by":author.id,
        "tags":this.tags
      };
      console.log(news);
      this.ApiDataService.createNews(news).then(r => {
        console.log(r);
        if (r.status == 200) {
          alert("News created successfully");
          //this.router.navigate(['/author', this.author_data.id]);
        }
      });

    });


  }

}
