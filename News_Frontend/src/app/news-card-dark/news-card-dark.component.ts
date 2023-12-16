import { Component, Input, Output, inject, EventEmitter} from '@angular/core';
import { news } from '../interfaces';
import {ApiDataService} from "../api-data.service";


@Component({
  selector: 'app-news-card-dark',
  standalone: true,
  imports: [],
  templateUrl: './news-card-dark.component.html',
  //styleUrl: './news-card-dark.component.css'
  styleUrls: ['./news-card-dark.component.scss', './news-card-dark.component.css'],
})
export class NewsCardDarkComponent {
  ApiDataService = inject(ApiDataService);
  @Input() news: news = { id: 0, title: '', description : '', content : '', published_by : 0};
  @Input() news_author: string | undefined;

  @Output() author_click : EventEmitter<any> = new EventEmitter<any>();

  onAuthorClick() {
    this.author_click.emit();
  }

  constructor() {
    
  }
}
