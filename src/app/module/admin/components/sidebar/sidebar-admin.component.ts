import { Component, HostListener } from "@angular/core";
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
    this.desplegarMenuSidebar = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    if (width >= 998) { // cambia el ancho según el tamaño de la pantalla en que se quiera hacer el cambio de estilos
      this.desplegarMenuSidebar = true; // actualiza la variable que se va a usar en el ngStyle
    } else {
      this.desplegarMenuSidebar = false; // valor por defecto
    }
  }
  cerrarSesion(): void {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
  cambiarEstadoSideBar(): void {
    this.desplegarMenuSidebar = !this.desplegarMenuSidebar
  }
}
