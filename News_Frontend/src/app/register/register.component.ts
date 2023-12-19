import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  isAuthor: boolean = false;



  constructor(private router: Router) { }

  onSubmit() {
    if(this.password != this.confirmPassword){
      alert("Passwords do not match");
    }
    else{
      const json ={"email":this.email,"password":this.password,"username":this.username,"firstName":this.firstName,"lastName":this.lastName};
      this.ApiDataService.registerUser(json).then(r => {
        console.log(r);
        if (r == "Created") {
          this.router.navigate(['login']);
        }
      });
    }
  }



}
