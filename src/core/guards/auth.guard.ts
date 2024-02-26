import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../../features/login/service/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return loginService
    .verifyToken()
    .pipe(
      map((isAuthenticated) =>
        !!isAuthenticated.length ? true : router.createUrlTree(['login'])
      )
    );
};