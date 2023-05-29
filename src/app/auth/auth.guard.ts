import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }
  console.log('Not logged in, redirecting and adding redirect url...');
  // Redirect to the login page
  return router.parseUrl('/login');
};
