import {Component, inject} from '@angular/core';
import {NewsCardDarkComponent} from "../news-card-dark/news-card-dark.component";
import {NewsCardLightComponent} from "../news-card-light/news-card-light.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiDataService} from "../api-data.service";
import {AuthService} from "../auth.service";
import {author, news, publisher, user} from "../interfaces";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-author-profile',
  standalone: true,
  imports: [
    NewsCardDarkComponent,
    NewsCardLightComponent,
    NgForOf,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './author-profile.component.html',
  styleUrl: './author-profile.component.css'
})
export class AuthorProfileComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);
  newsArticles: any[] = [];
  selectedNews: any = {};
  authors: Map<number, string> = new Map<number, string>();
  publishers: Map<number, string> = new Map<number, string>();
  author_data:any = {};
  newsTitle: string | undefined;
  newsDescription: string | undefined;
  newsContent: string | undefined;
  tags : any[] = [];
  isAuthor: boolean = false;
  u_id : number;
  user : any = {};
  all_interests: any = [];
  selectedInterestsInitial: any[] = [];


  constructor(private router: Router, private route: ActivatedRoute) {
    this.u_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getUser(this.u_id).then((user : any) => {
      this.user = user;
      if (user.is_author) {
        this.isAuthor= true;
        this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
          this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
            this.newsArticles = news1;
            //console.log("news",this.newsArticles)
            for (let i = 0; i < this.newsArticles.length; i++) {
              const published = this.newsArticles[i].published_by;
              this.ApiDataService.getAuthor(published).then((author: author) => {
                //console.log(author);
                this.ApiDataService.getPublisher(author.publisher).then((publisher : publisher) => {
                  //console.log(publisher);
                  this.publishers.set(this.newsArticles[i].id, publisher.name);
                });
                this.ApiDataService.getUser(author.user).then((user: user) => {
                  //console.log(user);
                  this.authors.set(this.newsArticles[i].id, user.username);
                });
              });
            }
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

  redirectPublisher(news : news) {
    this.selectedNews = news;
    const published = news.published_by;
    this.ApiDataService.getAuthor(published).then((author : author) => {
      //console.log(author);
      const publisher_id = author.publisher;
      this.router.navigate(['/publisher', publisher_id]);
    });
  }

  closeEditModal() {
    const modal = document.getElementById('editModal');

    if (modal) {
      modal.style.display = 'none';
    }
  }



  saveEditChanges () {
    const title = document.getElementById('edittitle') as HTMLInputElement;
    const description = document.getElementById('editdescription') as HTMLInputElement;
    const content = document.getElementById('editcontent') as HTMLInputElement;
    const tags = document.getElementById('tags') as HTMLInputElement;
    //console.log(title.value);
    //console.log(description.value);
    //console.log(content.value);
    //console.log(this.selectedInterestsInitial);
    const news = {
      "title": title.value,
      "description": description.value,
      "content": content.value,
      "tags": this.selectedInterestsInitial
    };
    this.ApiDataService.updateNews(this.selectedNews.id, news).then(r => {
      //console.log(r);
      //console.log(this.u_id);
      this.ApiDataService.getUser(this.u_id).then((user : any) => {
        this.user = user;
        if (user.is_author) {
          this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
            this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
              this.newsArticles = news1;
              //console.log(this.newsArticles)
              for (let i = 0; i < this.newsArticles.length; i++) {
                const putblished = this.newsArticles[i].published_by;
                this.ApiDataService.getAuthor(putblished).then((author: author) => {
                  //console.log(author);
                  this.ApiDataService.getUser(author.user).then((user: user) => {
                    //console.log(user);
                    this.authors.set(this.newsArticles[i].id, user.username);
                  });
                });
              }
            });
          });
        }
      });
      this.closeEditModal();
    });
  }

  onDeleteClick(news: any) {
    //console.log(news);
    this.ApiDataService.deleteNew(news.id).then(r => {
      this.ApiDataService.getUser(this.u_id).then((user : any) => {
        this.user = user;
        if (user.is_author) {
          this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
            this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
              this.newsArticles = news1;
              for (let i = 0; i < this.newsArticles.length; i++) {
                const putblished = this.newsArticles[i].published_by;
                this.ApiDataService.getAuthor(putblished).then((author: author) => {
                  //console.log(author);
                  this.ApiDataService.getUser(author.user).then((user: user) => {
                    //console.log(user);
                    this.authors.set(this.newsArticles[i].id, user.username);
                  });
                });
              }
            });
          });
        }
      });
    });
  }

    onEditClick(news: any) {
      this.selectedNews = news;
      const modal = document.getElementById('editModal');
      const title = document.getElementById('edittitle') as HTMLInputElement;
      const description = document.getElementById('editdescription') as HTMLInputElement;
      const content = document.getElementById('editcontent') as HTMLInputElement;

      if (modal) {
        modal.style.display = 'block';
      }
      if (title) {
        title.value = news.title;
      }
      if (description) {
        description.value = news.description;
      }
      if (content) {
        content.value = news.content;
      }

      this.ApiDataService.getInterests().then((interests: any) => {
        //console.log(interests);
        this.all_interests = interests;
        this.selectedInterestsInitial = news.tags;
      });
    }

  isInterestSelected(interestId: number): boolean {
    return this.selectedInterestsInitial.includes(interestId);
  }

  toggleInterestSelection(interestId: number): void {
    if (this.isInterestSelected(interestId)) {
      this.selectedInterestsInitial = this.selectedInterestsInitial.filter(id => id !== interestId);
    } else {
      this.selectedInterestsInitial.push(interestId);
    }
  }


}
