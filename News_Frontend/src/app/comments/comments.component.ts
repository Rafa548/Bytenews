// comments.component.ts

import { Component, Input, Output, inject, EventEmitter, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { news } from '../interfaces';
import {ApiDataService} from "../api-data.service";
import {NgIf, NgFor} from "@angular/common";
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';


import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss', './comments.component.css']
})
export class CommentsComponent {
  @Input() selectedNews: any; // Assuming you have a selectedNews input

  ApiDataService = inject(ApiDataService);
  comments: string[] = [];
  newComment: string = '';
  AuthService = inject(AuthService);
  commentForm: FormGroup;
  news_comments: any[] = [];
  news_comments_author: Map<number, string> = new Map<number, string>();
  currentUser : any;
  userId: any;
  currentUserIsAdmin : any;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      newComment: ['', Validators.required],
    });
    this.currentUser = this.AuthService.getUser();
    if (typeof localStorage !== 'undefined') {
      this.userId = localStorage.getItem('currentUserId');
    }
    this.currentUserIsAdmin = this.currentUser.is_admin;
    this.loadNewsComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedNews'] && !changes['selectedNews'].firstChange) {
      this.loadNewsComments();
    }
  }

  private loadNewsComments() {
    if (this.selectedNews) {
      this.ApiDataService.getNewsComments(this.selectedNews.id).then((comments: any) => {
        console.log(comments);
        this.news_comments = comments;
        for (let i = 0; i < this.news_comments.length; i++) {
          const user_id = this.news_comments[i].user;
          this.ApiDataService.getUser(user_id).then((user : any) => {
            this.news_comments_author.set(this.news_comments[i].id, user.username);
          });
        }
        console.log(this.news_comments_author);
      });
    }
  }

  submitComment() {

    if (this.commentForm.valid) {
      const newCommentValue = this.commentForm.get('newComment')?.value;
      console.log(newCommentValue);
      this.ApiDataService.postComment(this.selectedNews.id, this.userId, newCommentValue).then((comment: any) => {
        console.log(comment);
        this.loadNewsComments();

      });

      this.commentForm.reset();

    }

  }

  deleteNewsComment(comment: any) {
    this.ApiDataService.deleteNewsComment(comment.id).then((data : any) => {
      console.log(data);
      this.loadNewsComments();
      if (data == "ERROR") {
        return;
      }
      else{
        console.log("Comment deleted");
      }
    });

  }
}
