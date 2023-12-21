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
  author_data:any = {};
  newsTitle: string | undefined;
  newsDescription: string | undefined;
  newsContent: string | undefined;
  tags : any[] = [];
  isAuthor: boolean = false;
  u_id : number;
  user : any = {};

  constructor(private router: Router, private route: ActivatedRoute) {
    //this.author_data = this.AuthService.getUser();
    //console.log(this.author_data);
    //this.isAuthor=this.author_data.is_author;
    //console.log(this.isAuthor)
    this.u_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getUser(this.u_id).then((user : any) => {
      this.user = user;
      if (user.is_author) {
        this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
          console.log()
          this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
            console.log(author.id)
            this.newsArticles = news1;
            console.log("news",this.newsArticles)
            for (let i = 0; i < this.newsArticles.length; i++) {
              const published = this.newsArticles[i].published_by;
              this.ApiDataService.getAuthor(published).then((author: author) => {
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
  }

  redirectAuthor(news : any) {
    this.selectedNews = news;
    const author_id = news.published_by;
    this.router.navigate(['/author', author_id]);

  }

  closeCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  closeEditModal() {
    const modal = document.getElementById('editModal');
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
    console.log("guhuh");
    this.ApiDataService.getAuthorByUser(this.u_id).then((author : author) => {
      console.log("author",author);
      console.log("author.id",author.id);
      const news = {
        "title": this.newsTitle,
        "description": this.newsDescription,
        "content": this.newsContent,
        "published_by":author.id,
        "tags":this.tags
      };
      this.ApiDataService.createNews(news).then(r => {
        console.log(r);
        console.log("nhfejnfein",this.u_id);
        this.ApiDataService.getUser(this.u_id).then((user : any) => {
          this.user = user;
          if (user.is_author) {
            this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
              this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
                this.newsArticles = news1;
                console.log(this.newsArticles)
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
        this.closeCreateModal();
      });

    });
  }

  saveEditChanges () {
    const title = document.getElementById('edittitle') as HTMLInputElement;
    const description = document.getElementById('editdescription') as HTMLInputElement;
    const content = document.getElementById('editcontent') as HTMLInputElement;
    console.log(title.value);
    console.log(description.value);
    console.log(content.value);
    const news = {
      "title": title.value,
      "description": description.value,
      "content": content.value,
    };
    console.log(this.selectedNews);
    this.ApiDataService.updateNews(this.selectedNews.id, news).then(r => {
      console.log(r);
      console.log(this.u_id);
      this.ApiDataService.getUser(this.u_id).then((user : any) => {
        this.user = user;
        if (user.is_author) {
          this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
            this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
              this.newsArticles = news1;
              console.log(this.newsArticles)
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
    console.log(news);
    console.log(news.id);
    this.ApiDataService.deleteNew(news.id).then(r => {
      console.log(r);
      console.log("jjj",this.u_id);
      this.ApiDataService.getUser(this.u_id).then((user : any) => {
        this.user = user;
        if (user.is_author) {
          this.ApiDataService.getAuthorByUser(this.u_id).then((author : any) => {
            this.ApiDataService.getAuthorNews(author.id).then((news1: any) => {
              this.newsArticles = news1;
              console.log(this.newsArticles)
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
  }


}
