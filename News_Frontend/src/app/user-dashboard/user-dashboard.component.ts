import { Component, inject} from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsCardDarkComponent } from '../news-card-dark/news-card-dark.component';
import { NewsCardLightComponent } from '../news-card-light/news-card-light.component';
import {ApiDataService} from "../api-data.service";
import {AuthService} from "../auth.service";
import {author, news, publisher, user} from "../interfaces";
import {NgIf, NgFor} from "@angular/common";
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NewsCardComponent, NewsCardDarkComponent, NewsCardLightComponent, NgIf, NgFor, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);
  newsArticles: any[] = [];
  selectedNews: any = null;
  authors: Map<number, string> = new Map<number, string>();
  publishers: Map<number, string> = new Map<number, string>();
  currentUser = localStorage.getItem('currentUser');
  userId = localStorage.getItem('currentUserId');
  user_saved_news: any[] = [];
  isAuthor: boolean = false;
  author_data:any = {};
  searchForm: FormGroup;
  searchQuery: string = '';

  constructor(private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required],
    });
    console.log(this.currentUser)
    this.author_data = this.AuthService.getUser();
    this.isAuthor=this.author_data.is_author;
    console.log(this.isAuthor);
    this.ApiDataService.getNews().then((news1 : any) => {
      //console.log(news);
      this.newsArticles = news1;

      for (let i = 0; i < this.newsArticles.length; i++) {
        const published = this.newsArticles[i].published_by;
        this.ApiDataService.getAuthor(published).then((author : author) => {
          //console.log(author);
          this.ApiDataService.getPublisher(author.publisher).then((publisher : publisher) => {
            //console.log(publisher);
            this.publishers.set(this.newsArticles[i].id, publisher.name);
          });
          this.ApiDataService.getUser(author.user).then((user : user) => {
            //console.log(user);
            this.authors.set(this.newsArticles[i].id, user.username);
            
          });
        });
      }
      //console.log(this.newsArticles);
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

  redirectPublisher(news : news) {
    this.selectedNews = news;
    const published = news.published_by;
    this.ApiDataService.getAuthor(published).then((author : author) => {
      //console.log(author);
      const publisher_id = author.publisher;
      this.router.navigate(['/publisher', publisher_id]);
    });
  }

  saveNews(news : news) {
    this.selectedNews = news;
    const user_id =Number(this.userId)
    

    this.ApiDataService.saveNews(news.id, user_id).then((data : any) => {
      console.log(data);
      this.ApiDataService.getNewsByUser(user_id).then((news : any) => {
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

  submitSearch() {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.get('searchQuery')?.value;
      console.log(searchValue);
      this.ApiDataService.getNewsByTitle(searchValue).then((news: any) => {
        console.log(news);
        this.newsArticles = news;
        for (let i = 0; i < this.newsArticles.length; i++) {
          const published = this.newsArticles[i].published_by;
          this.ApiDataService.getAuthor(published).then((author : author) => {
            //console.log(author);
            this.ApiDataService.getUser(author.user).then((user : user) => {
              //console.log(user);
              this.authors.set(this.newsArticles[i].id, user.username);
            });
          });
        }
        console.log(this.newsArticles);
      });
      this.searchForm.reset();
    }
  }

  clearSearch() {
    this.ApiDataService.getNews().then((news1 : any) => {
      //console.log(news);
      this.newsArticles = news1;

      for (let i = 0; i < this.newsArticles.length; i++) {
        const published = this.newsArticles[i].published_by;
        this.ApiDataService.getAuthor(published).then((author : author) => {
          //console.log(author);
          this.ApiDataService.getUser(author.user).then((user : user) => {
            //console.log(user);
            this.authors.set(this.newsArticles[i].id, user.username);
          });
        });
      }
      //console.log(this.newsArticles);
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
