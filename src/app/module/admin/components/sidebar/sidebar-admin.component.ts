import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/module/login/services/login/login.service";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent {
  desplegarMenuSidebar: boolean;
  constructor(
    private _loginService: LoginService,
    private router: Router
  ) {
    this.desplegarMenuSidebar = false;
  }

  cerrarSesion(): void{
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
  cambiarEstadoSideBar(): void{
    this.desplegarMenuSidebar = !this.desplegarMenuSidebar
  }
}
