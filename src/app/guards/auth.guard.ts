import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importe o nosso serviço

export const authGuard: CanActivateFn = (route, state) => {
  // A nova forma de injetar serviços em funções como esta
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos se o utilizador está autenticado
  if (authService.isAuthenticated()) {
    return true; // Sim, pode aceder à rota
  } else {
    // Não, não está autenticado.
    // Redirecionamos para a página de login e negamos o acesso.
    router.navigate(['/login']);
    return false;
  }
};