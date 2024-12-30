import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./'])
      }
    }),
    map(isAuthenticated=> !isAuthenticated)
  );
};

export const canActivateGuardToPrinciple: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  return checkAuthStatus();
};

export const canMatchGuardToPrinciple: CanMatchFn = (route: Route, segments: UrlSegment[]) => {

  return checkAuthStatus();
};
