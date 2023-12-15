import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../api-data.service';
import {NgForOf, NgIf} from "@angular/common";
import {news} from '../interfaces'

@Component({
  selector: 'app-admin-all-news',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-all-news.component.html',
  styleUrl: './admin-all-news.component.css'
})


export class AdminAllNewsComponent {
  news: news[] = [];
  ApiDataService = inject(ApiDataService);


  constructor(private router: Router) {
    this.ApiDataService.getNews().then((news : news[]) => {
      this.news = news;
      //console.log(classes);

    });
  }

  navigateToNewDetails(newsId: number) {
    this.router.navigate(['admin/new', newsId]); // Navigate to a route like '/class/1' based on the class ID
  }

  deleteNew(event: Event, id: number) {
    console.log("hello")
    //event.stopPropagation();
    //this.ApiDataService.deleteClass(localStorage.getItem('token'), classname).then((response : any) => {
      //console.log(response);
      //this.ApiDataService.getClasses(localStorage.getItem('token')).then((classes : any[]) => {
        //this.classes = classes;
        //console.log(classes);
      //});
    //});

  }

}
