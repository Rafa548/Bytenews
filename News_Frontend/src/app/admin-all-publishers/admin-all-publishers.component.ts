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
    this.ApiDataService.deletePublisher(id).then((publisher : any) => {
      this.ApiDataService.getPublishers().then((publishers : any[]) => {
        this.publishers = publishers;
        //console.log(publishers);
      } );
    } );
  }
}
