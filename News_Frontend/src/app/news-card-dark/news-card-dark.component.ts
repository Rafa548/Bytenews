import { Component, Input, Output, inject, EventEmitter} from '@angular/core';
import { news } from '../interfaces';
import {ApiDataService} from "../api-data.service";
import {NgIf, NgFor} from "@angular/common";


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
  @Input() news: news = { id: 0, title: '', description : '', content : '', published_by : 0};
  @Input() news_author: string | undefined;
  @Input() is_saved: boolean = false;

  @Output() author_click : EventEmitter<any> = new EventEmitter<any>();
  @Output() click_save : EventEmitter<any> = new EventEmitter<any>();
  @Output() click_unsave : EventEmitter<any> = new EventEmitter<any>();


  onAuthorClick() {
    this.author_click.emit();
  }

  ClickSave() {
    this.click_save.emit();
  }

  ClickUnSave() {
    this.click_unsave.emit();
  }

  constructor() {
    
  }
}
