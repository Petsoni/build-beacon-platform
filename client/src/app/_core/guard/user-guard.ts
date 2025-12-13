// src/app/guards/user-guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth-service';

export const UserGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return timer(0, 50).pipe(
    map(() => authService.getSessionQueryState()),
    filter((state) => !state.isPending),
    take(1),
    map((state) => {
      if (state.data) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};
