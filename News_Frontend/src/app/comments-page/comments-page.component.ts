import {Component, inject} from '@angular/core';
import {ApiDataService} from "../api-data.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-comments-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.css'
})
export class CommentsPageComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);
  comments: any = [];
  u_id: number | undefined;
  isAuthor: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.fetchComments();
  }

  fetchComments() {
    this.u_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getUser(this.u_id).then((user: any) => {
      if (user.is_author) {
        this.isAuthor = true;
      }
    });
    this.ApiDataService.getCommentsByUser(this.u_id).then((comments: any) => {
      this.comments = comments;
      console.log("comments", this.comments)
      for (let i = 0; i < this.comments.length; i++) {
      }
    });
  }

  redirectToNewsPage(news: any) {
    console.log("news", news)
    this.router.navigate(['/news/' + news]);
  }

  deleteComment(comment: any) {
    this.ApiDataService.deleteNewsComment(comment.id).then((data : any) => {
      console.log(data);
      this.fetchComments();
      if (data == "ERROR") {
        return;
      }
      else{
        console.log("Comment deleted");
      }
    });
  }
}
