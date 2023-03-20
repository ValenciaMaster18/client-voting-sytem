import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent{
  desplegar: boolean;
  constructor(
    public dialog: MatDialog
  ) {
    this.desplegar = false;
  }

  openDialog(animacionEntrar: string,  animacionSalir: string): void {
    // Cambiamos en el archivo su modificador de acceso de private a public
    if (this.dialog._openDialogsAtThisLevel.length == 0){
      this.dialog.open(DialogComponent, {
        width: '600px',
        height: '150px',
        enterAnimationDuration: animacionEntrar,
        exitAnimationDuration: animacionSalir,
        position: {
          // top: '-10%',
          left: '30%',
          bottom: '50px'
        }
      });
    }else{
      this.dialog.closeAll()
    }
  };
  desplegarMenu(): void{
    this.desplegar = !this.desplegar;
  }
};
