import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
