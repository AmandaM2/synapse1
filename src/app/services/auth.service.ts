import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; 

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
    const user = this.users.find(u => u.email === email);
    if (user && password === 'abcd1234') {
      localStorage.setItem('authToken', 'meu-token-secreto');
      localStorage.setItem('currentUserId', user.id); 
      return true;
    }
    return false;
  }

  register(userData: any): boolean {
    
    if (this.emailExists(userData.email)) {
      alert('Este endereço de e-mail já foi registado. Por favor, tente fazer o login.');
      return false; 
    }
  
    
    const newUser: User = {
      id: new Date().getTime().toString(),
      name: userData.name,
      email: userData.email,
      birthDate: new Date(userData.birthDate),
      profession: userData.profession,
      interests: userData.interests
    };
    this.users.push(newUser);
    this.saveUsersToLocalStorage();
    console.log('Novo utilizador registado e guardado:', this.users);
    return true; 
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public emailExists(email: string): boolean {

    return this.users.some(user => user.email === email);
  }
  

  public getUsers(): User[] {
    
    return [...this.users];
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId'); 
    this.router.navigate(['/login']);
  }

  
  public getCurrentUserId(): string | null {
    return localStorage.getItem('currentUserId');
  }
}