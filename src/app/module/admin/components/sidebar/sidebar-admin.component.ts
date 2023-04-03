import { Component } from "@angular/core";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent {
  desplegarMenuSidebar: boolean;
  desplegar: boolean;
  desplegar2: boolean;
  desplegar3: boolean;
  constructor(
    // public dialog: MatDialog
  ) {
    this.desplegarMenuSidebar = false;
    this.desplegar = false;
    this.desplegar2 = false;
    this.desplegar3 = false;

  }

  // openDialog(animacionEntrar: string,  animacionSalir: string): void {
  //   Cambiamos en el archivo su modificador de acceso de private a public
  //   if (this.dialog._openDialogsAtThisLevel.length == 0){
  //     this.dialog.open(DialogComponent, {
  //       width: '600px',
  //       height: '150px',
  //       enterAnimationDuration: animacionEntrar,
  //       exitAnimationDuration: animacionSalir,
  //       position: {
  //         // top: '-10%',
  //         left: '30%',
  //         bottom: '50px'
  //       }
  //     });
  //   }else{
  //     this.dialog.closeAll()
  //   }
  // };
  cambiarEstadoSideBar(): void{
    this.desplegarMenuSidebar = !this.desplegarMenuSidebar
  }
  desplegarMenu(): void {
    this.desplegar = !this.desplegar;
    this.desplegar2 = false;
    this.desplegar3 = false;


  }
  desplegarMenu2(): void {
    this.desplegar2 = !this.desplegar2;
    this.desplegar = false;
    this.desplegar3 = false;
  }
  desplegarMenu3(): void {
    this.desplegar3 = !this.desplegar3;
    this.desplegar = false;
    this.desplegar2 = false;
  }
}
