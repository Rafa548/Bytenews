import {Component, inject} from '@angular/core';
import {AdminAllDetailsPageComponent} from "../admin-all-details-page/admin-all-details-page.component";
import {interest} from "../interfaces";
import {Router} from "@angular/router";
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-admin-all-interests',
  standalone: true,
    imports: [
        AdminAllDetailsPageComponent
    ],
  templateUrl: './admin-all-interests.component.html',
  styleUrl: './admin-all-interests.component.css'
})
export class AdminAllInterestsComponent {
  interests: interest[] = [];
  ApiDataService = inject(ApiDataService);


  constructor(private router: Router) {
    this.ApiDataService.getInterests().then((interests: interest[]) => {
      this.interests = interests;
    });
  }
  deleteInterest(id: number) {
    //console.log(id);
    this.ApiDataService.deleteInterest(id).then((response : any) => {
      this.ApiDataService.getInterests().then((interests: interest[]) => {
        this.interests = interests;
      });
    });
  }

  navigateToInterestDetails(id: number) {
    this.router.navigate(['/admin/interests', id]);
  }

  reload() {
    this.ApiDataService.getInterests().then((interests: interest[]) => {
      this.interests = interests;
    });
  }
}
