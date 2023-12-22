import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  AuthService = inject(AuthService);

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.AuthService.getUser();
    const id = Number(route.paramMap.get('id'));
    if (user && user.id === id) {
      return true;
    }
    else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
