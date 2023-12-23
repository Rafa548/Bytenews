import { Component, Input, Output, inject, EventEmitter} from '@angular/core';
import { news } from '../interfaces';
import {ApiDataService} from "../api-data.service";
import {NgIf, NgFor} from "@angular/common";
import { Router } from '@angular/router';
import { interest } from '../interfaces';
import { AuthService } from '../auth.service';
import {user} from "../interfaces";

@Component({
  selector: 'app-news-card-dark',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './news-card-dark.component.html',
  //styleUrl: './news-card-dark.component.css'
  styleUrls: ['./news-card-dark.component.scss', './news-card-dark.component.css'],
})
export class NewsCardDarkComponent {
  ApiDataService = inject(ApiDataService);
  @Input() news: news = { id: 0, title: '', description : '', content : '', published_by : 0, tags : []};
  @Input() news_author: string | undefined;
  @Input() is_saved: boolean = false;
  @Input() publisher: string | undefined;

  authservice = inject(AuthService);
  currentUser: any = null;

  @Input() showButton: boolean = false;
  @Output() author_click : EventEmitter<any> = new EventEmitter<any>();
  @Output() publisher_click : EventEmitter<any> = new EventEmitter<any>();
  @Output() click_save : EventEmitter<any> = new EventEmitter<any>();
  @Output() click_unsave : EventEmitter<any> = new EventEmitter<any>();
  @Output() click_tag : EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();

  tags_names: Map<number, string> = new Map<number, string>();

  onAuthorClick() {
    this.author_click.emit();
  }

  onPublisherClick() {
    this.publisher_click.emit();
  }

  ClickSave() {
    this.click_save.emit();
  }

  ClickUnSave() {
    this.click_unsave.emit();
  }

  ClickTag(tag: number) {
    this.router.navigate(['/news/interest/' + tag]);
    this.click_tag.emit();
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

  onEditClick(): void {
    this.editClick.emit();
  }

  constructor(private router: Router) {

    console.log(this.currentUser);
    console.log(this.is_saved);
    this.currentUser = this.authservice.getUser();

    this.ApiDataService.getInterests().then((interests : any) => {
      for (let i = 0; i < interests.length; i++) {
        this.tags_names.set(interests[i].id, interests[i].name);
      }
    });


  }



  
  


  

  ClickNews() {
    this.router.navigate(['/news/' + this.news.id]);
  }


  
}
