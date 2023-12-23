import { Component, inject} from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsCardDarkComponent } from '../news-card-dark/news-card-dark.component';
import { NewsCardLightComponent } from '../news-card-light/news-card-light.component';
import {ApiDataService} from "../api-data.service";
import {author, news, publisher, user} from "../interfaces";
import {NgIf, NgFor} from "@angular/common";
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-author-news',
  standalone: true,
  imports: [NewsCardComponent, NewsCardDarkComponent, NewsCardLightComponent, NgIf, NgFor, NavbarComponent],
  templateUrl: './author-news.component.html',
  styleUrl: './author-news.component.css'
})
export class AuthorNewsComponent {
  ApiDataService = inject(ApiDataService);
  newsArticles: any[] = [];
  selectedNews: any = null;
  AuthService = inject(AuthService);
  authors: Map<number, string> = new Map<number, string>();
  currentUser : any;
  userId: any
  user_saved_news: any[] = [];
  author_name: string = "";
  isAuthor: boolean = false;

  constructor(private router: Router) {
    const url = window.location.href;
    const url_split = url.split('/');
    const author_id = url_split[url_split.length - 1];
    const author_id_int = parseInt(author_id);
    console.log(author_id);
    this.currentUser = this.AuthService.getUser();
    this.isAuthor = this.currentUser.is_author;
    if (typeof localStorage !== 'undefined') {
      this.userId = localStorage.getItem('currentUserId');
    }

    this.ApiDataService.getAuthor(author_id_int).then((author : author) => {
      console.log(author);
      this.ApiDataService.getAuthorNews(author.id).then((news : any) => {
        console.log(news);
        this.newsArticles = news;
        for (let i = 0; i < this.newsArticles.length; i++) {
          const published = this.newsArticles[i].published_by;
          this.ApiDataService.getAuthor(published).then((author : author) => {
            console.log(author);
            this.ApiDataService.getUser(author.user).then((user : user) => {
              console.log(user);
              this.authors.set(this.newsArticles[i].id, user.username);
            });
          });
        }
      });
      this.ApiDataService.getUser(author.user).then((user : user) => {
        console.log(user);
        this.author_name = user.username;


      });
    });



    this.ApiDataService.getNewsByUser(Number(this.userId)).then((news : any) => {
      console.log(news);
      this.user_saved_news = news;
    });
  }

  redirectAuthor(news : news) {
    this.selectedNews = news;
    const author_id = news.published_by;

    this.router.navigate(['/author', author_id]);

  }

  saveNews(news : news) {
    this.selectedNews = news;
    const user_id = this.userId

    this.ApiDataService.saveNews(news.id, user_id).then((data : any) => {
      console.log(data);
      this.ApiDataService.getNewsByUser(Number(this.userId)).then((news : any) => {
        console.log(news);
        this.user_saved_news = news;
      });
      if (data == "ERROR") {
        return;
      }
      else{
        console.log("News saved");
      }
    });
  }

  unsaveNews(news : news) {
    this.selectedNews = news;
    const user_id = this.userId

    this.ApiDataService.unsaveNews(news.id, user_id).then((data : any) => {
      console.log(data);
      this.ApiDataService.getNewsByUser(Number(this.userId)).then((news : any) => {
        console.log(news);
        this.user_saved_news = news;
      });
      if (data == "ERROR") {
        return;
      }
      else{
        console.log("News unsaved");
      }
    });
  }

  is_saved(news : news) {
    for (let i = 0; i < this.user_saved_news.length; i++) {
      if (this.user_saved_news[i].id == news.id) {
        return true;
      }
    }
    return false;
  }

}
