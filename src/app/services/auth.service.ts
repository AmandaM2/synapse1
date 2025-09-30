import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string): boolean{
    if(email && password === '123456'){
      localStorage.setItem('authToken', 'meu-token-secreto');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean{
    return !!localStorage.getItem('authToken');

  }

  logout(): void{
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
