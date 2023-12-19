import { Component, inject} from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsCardDarkComponent } from '../news-card-dark/news-card-dark.component';
import { NewsCardLightComponent } from '../news-card-light/news-card-light.component';
import {ApiDataService} from "../api-data.service";
import {author, news, publisher, user} from "../interfaces";
import {NgIf, NgFor} from "@angular/common";
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [NewsCardComponent, NewsCardDarkComponent, NewsCardLightComponent, NgIf, NgFor, NavbarComponent, CommentsComponent],

  templateUrl: './news-page.component.html',
  //styleUrl: './news-page.component.css'
  styleUrls: ['./news-page.component.scss', './news-page.component.css'],
})
export class NewsPageComponent {
  ApiDataService = inject(ApiDataService);
  selectedNews: any;
  currentUser = localStorage.getItem('currentUser');
  userId = localStorage.getItem('currentUserId');
  user_saved_news: any[] = [];
  author: any = null;
  comments: any[] = [];

  constructor(private router: Router) {
    //get news id from url
    const url = window.location.href;
    const url_split = url.split('/');
    const news_id = url_split[url_split.length - 1];
    console.log(news_id);
    //convert news id to int
    const news_id_int = parseInt(news_id);
    this.ApiDataService.getNew(news_id_int).then((news : any) => {
      console.log(news);
      this.selectedNews = news;
      const published = this.selectedNews.published_by;
      this.ApiDataService.getAuthor(published).then((author : author) => {
        //console.log(author);
        this.ApiDataService.getUser(author.user).then((user : user) => {
          //console.log(user);
          this.author = user.username;
        });
      });
    });
    this.ApiDataService.getSavedNews(this.userId).then((news : any) => {
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
      this.ApiDataService.getSavedNews(this.userId).then((news : any) => {
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
      this.ApiDataService.getSavedNews(this.userId).then((news : any) => {
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
