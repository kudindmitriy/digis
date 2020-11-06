import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private isUserAuthenticated: boolean;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const token = this.tokenStorageService.getToken();
  //   if (token) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(observer => {
      this.tokenStorageService.isAuthenticated().pipe(take(1)).subscribe(data => {
        if (data) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(this.router.createUrlTree(['login']));
          observer.complete();
        }
      }, () => {
        observer.next(this.router.createUrlTree(['login']));
        observer.complete();
      });
    });
  }
}
