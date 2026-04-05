import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth-service';
import { map, catchError, of } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogin().pipe(
    map((res) => {
      // User is logged in → block login page and redirect
      router.navigate(['/']);
      return false;
    }),
    catchError((err) => {
      // Not logged in → allow access to login page
      return of(true);
    }),
  );
};
