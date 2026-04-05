import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth-service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogin().pipe(
    map((res) => {
      return true;
    }),
    catchError((err) => {
      console.log(err);
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
