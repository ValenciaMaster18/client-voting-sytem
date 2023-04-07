import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/module/login/services/login/login.service';

@Component({
  selector: 'app-header-aprendiz',
  templateUrl: './header-aprendiz.component.html',
  styleUrls: ['./header-aprendiz.component.scss']
})
export class HeaderAprendizComponent {
  constructor(
    private _loginService: LoginService,
    private router: Router

  ){

  }
  cerrarSesion(): void{
    this.router.navigate(['/login']);
    this._loginService.logout();
  }
}
