import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private storageService: StorageService, private router: Router){

  }
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //AQUI VA NUESTRA LOGICA: si funciona entregame un TRUE, sino funciona mandame a login:

    var isAuth: any = this.storageService.getAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }else{
      return true;
    }

  }
  
}
