import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // Importe o nosso novo modelo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_STORAGE_KEY = 'synapse-users';
  private users: User[] = [];

  constructor(private router: Router) {
    this.loadUsersFromLocalStorage();
  }

  private loadUsersFromLocalStorage(): void {
    const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (usersJson) {
      this.users = JSON.parse(usersJson);
    }
  }

  private saveUsersToLocalStorage(): void {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(this.users));
  }

  login(email: string, password: string): boolean {
    // Numa app real, a verificação seria mais complexa
    const userExists = this.users.find(user => user.email === email);
    if (userExists && password === '123456') { // A senha continua "hardcoded" por enquanto
      localStorage.setItem('authToken', 'meu-token-secreto');
      return true;
    }
    return false;
  }

  register(userData: any): void {
    const newUser: User = {
      id: new Date().getTime().toString(),
      name: userData.name,
      email: userData.email,
      age: userData.age,
      profession: userData.profession,
      interests: userData.interests
    };
    this.users.push(newUser);
    this.saveUsersToLocalStorage(); // Guarda a nova lista de utilizadores
    console.log('Novo utilizador registado e guardado:', this.users);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}