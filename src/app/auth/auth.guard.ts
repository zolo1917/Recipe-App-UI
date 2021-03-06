import { map, take } from 'rxjs/operators';
import { authService } from './auth-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authServe: authService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise <boolean> | Observable<boolean | UrlTree>{
        return this.authServe.user.pipe(
            take(1),
            map(user =>{
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }));
    }
}