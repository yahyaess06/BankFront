import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirige vers la page de login
    return router.parseUrl('/login');
  }

  return true;
};
