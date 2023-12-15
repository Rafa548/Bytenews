import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error : string = ''
  ApiDataService = inject(ApiDataService);
  AuthService = inject(AuthService);

  constructor(private router : Router) {

  }


  login() {
    this.ApiDataService.login(this.email, this.password).then((data : any) => {
      console.log(data);
      if (data == "ERROR") {
        this.error = "Wrong credentials";
        return;
      }

      else if (data.is_admin == true){
        console.log("ADMIN");
        this.AuthService.setUser(data);
        this.router.navigate(['/admin/dashboard']);
      }
      else if (data.is_author == true){
        console.log("AUTHOR");
        this.AuthService.setUser(data);
        this.router.navigate(['/admin/dashboard']);
        //this.router.navigate(['/student', data.nmec]);
      }
      else{
        console.log("USER");
        this.AuthService.setUser(data);
        this.router.navigate(['/admin/dashboard']);
      //this.router.navigate(['/teacher', data.nmec]);
      }
    });
  }
}
