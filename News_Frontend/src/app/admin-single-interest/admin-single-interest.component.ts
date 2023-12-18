import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import { ApiDataService } from '../api-data.service';
import {news} from "../interfaces";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-admin-single-interest',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './admin-single-interest.component.html',
  styleUrl: './admin-single-interest.component.css'
})
export class AdminSingleInterestComponent {
  interest : any;
  i_id : number;
  ApiDataService = inject(ApiDataService);
  interestNews : news[] = [];
  constructor(private router : Router,private route : ActivatedRoute) {
    this.i_id = Number(this.route.snapshot.paramMap.get('id'));
    this.ApiDataService.getInterest(this.i_id).then((interest : any) => {
      this.interest = interest.name;
      //console.log(interest);
    });
    this.ApiDataService.getNewsByInterest(this.i_id).then((interestNews : any[]) => {
      this.interestNews = interestNews;
      //console.log(interestNews);
    });
  }

  deleteNews(id: number) {
    this.ApiDataService.deleteNew(id).then((response : any) => {
      this.ApiDataService.getNewsByInterest(this.i_id).then((interestNews : any[]) => {
        this.interestNews = interestNews;
        //console.log(interestNews);
      });
    });
  }

  viewNewsDetails(id: number) {
    this.router.navigate(['admin/new', id]);
  }
}
