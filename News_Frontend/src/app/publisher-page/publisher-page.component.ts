import { Component, SimpleChanges, inject} from '@angular/core';
import { NewsCardDarkComponent } from '../news-card-dark/news-card-dark.component';
import {ApiDataService} from "../api-data.service";
import {AuthService} from "../auth.service";
import {author, interest, news, publisher, user} from "../interfaces";
import {NgIf, NgFor} from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-publisher-page',
  standalone: true,
  imports: [ NewsCardDarkComponent, NgIf, NgFor, NavbarComponent],
  templateUrl: './publisher-page.component.html',
  styleUrl: './publisher-page.component.css'
})
export class PublisherPageComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);

  newsArticles: any[] = [];
  selectedNews: any = null;
  authors: Map<number, string> = new Map<number, string>();
  publishers: Map<number, string> = new Map<number, string>();
  currentUser = localStorage.getItem('currentUser');
  userId = localStorage.getItem('currentUserId');
  user_saved_news: any[] = [];
  publisher: publisher = { id: 0, name: ''};
  publisher_id: number = 0;
  url = window.location.href;
  isAuthor: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.load_content();

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const url = window.location.href;

      this.load_content();
    });
  }

  load_content() {
    this.ApiDataService.getUser(Number(this.userId)).then((user : any) => {
      this.isAuthor = user.is_author;
    });

    const url = window.location.href;
    const url_split = url.split('/');
    const tag_id = url_split[url_split.length - 1];
    console.log(tag_id);
    //convert news id to int
    const tag_id_int = parseInt(tag_id);
    this.publisher_id = tag_id_int;
    this.ApiDataService.getNewsByPublisher(tag_id_int).then((news : any) => {
      console.log(news);
      this.newsArticles = news;
      for (let i = 0; i < this.newsArticles.length; i++) {
        const putblished = this.newsArticles[i].published_by;
        this.ApiDataService.getAuthor(putblished).then((author : author) => {
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

    this.ApiDataService.getPublisher(tag_id_int).then((publisher : publisher) => {
      console.log(publisher);
      this.publisher = publisher;
    });

  }

  redirectAuthor(news : news) {
    this.selectedNews = news;
    const author_id = news.published_by;

    this.router.navigate(['/author', author_id]);

  }

  redirectPublisher(news : news) {
    this.selectedNews = news;
    const publisher_id = news.published_by;

    this.router.navigate(['/publisher', publisher_id]);

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
