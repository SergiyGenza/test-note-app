import { inject } from '@angular/core';
import { Router, } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthorized().pipe(
    filter((user) => user !== undefined),
    map((user) => {
      if (!user) {
        router.navigateByUrl('login');
        return false;
      }
      return true;
    })
  )
}