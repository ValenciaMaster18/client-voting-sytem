import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent{

  constructor(
    public dialog: MatDialog
  ) {
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      height: '150px',
      position: {
        // top: '-10%',
        left: '30%',
        bottom: '50px'
      }
    });
  };
};
