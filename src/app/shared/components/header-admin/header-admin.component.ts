import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/module/login/services/login/login.service';
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent {
  constructor(
    private _loginService: LoginService,
    private router: Router

  ){

  }
  cerrarSesion(): void{
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
}
