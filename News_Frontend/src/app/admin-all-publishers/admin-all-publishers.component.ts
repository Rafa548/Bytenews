import {Component, inject} from '@angular/core';
import {AdminAllDetailsPageComponent} from "../admin-all-details-page/admin-all-details-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-admin-all-publishers',
  standalone: true,
    imports: [
        AdminAllDetailsPageComponent
    ],
  templateUrl: './admin-all-publishers.component.html',
  styleUrl: './admin-all-publishers.component.css'
})
export class AdminAllPublishersComponent {
  publishers : any[] = [];
  ApiDataService = inject(ApiDataService);

  constructor(private router: Router) {
    this.ApiDataService.getPublishers().then((publishers : any[]) => {
      this.publishers = publishers;
      //console.log(publishers);
    } );
  }

  navigateToDetails(id : number) {
    this.router.navigate(['/admin/publishers/' + id]);
  }


  delete(id: number) {
    this.ApiDataService.getUsers().then((users : any[]) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const u_id = users[i].id;
        this.ApiDataService.getAuthorByUser(u_id).then((author : any) => {
          if (author) {
            if (author.publisher === id) {
              this.ApiDataService.getAuthorNews(author.id).then((news: any) => {
                for (let i = 0; i < news.length; i++) {
                  this.ApiDataService.deleteNew(news[i].id);
                }
              });
              user.is_author = false;
              this.ApiDataService.updateUser(user);
              this.ApiDataService.deleteAuthor(author.id);
            }
          }
        });
      }
      this.ApiDataService.deletePublisher(id).then((publisher : any) => {
        this.ApiDataService.getPublishers().then((publishers : any[]) => {
          this.publishers = publishers;
          //console.log(publishers);
        } );
      });
    });

  }
}
