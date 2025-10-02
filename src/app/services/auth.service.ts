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
// ... (dentro da classe AuthService)

// NOVO MÉTODO: Simula o cadastro de um novo utilizador
register(userData: any): void {
  // Em uma aplicação real, aqui você faria uma requisição HTTP POST
  // para a sua API de backend para criar o utilizador na base de dados.
  console.log('Novo utilizador recebido pelo AuthService:', userData);
  // Podemos adicionar lógicas como verificar se o email já existe, etc.
}
}
