import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/module/login/services/token/token.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RedirectLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    protected _tokenService: TokenService
  ) {

  }
  canActivate(): boolean {
    const token = this._tokenService.getToken();
    if (token) {
      this.router.navigate(['/aprendiz'])
    }
    return true;
  }
}
