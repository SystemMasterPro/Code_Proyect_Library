import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class ChackLoginGuard implements CanActivate {
  constructor(public authService: ApiService, public router: Router, private cookieService: CookieService) { }

  canActivate(): boolean{
    const cookie = this.cookieService.check('token_access');
    if (cookie) {
      return true
    }
    this.router.navigate(['login'])
    return false
  }
}


@Injectable({providedIn: 'root'})
export class ChackLogoutGuard implements CanActivate {
  constructor(public authService: ApiService, public router: Router, private cookieService: CookieService) { }

  canActivate(): boolean{
    const cookie = this.cookieService.check('token_access');
    if (!cookie) {
      return true
    }
    this.router.navigate(['/'])
    return false
  }
}
