import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderAdminComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [HeaderAdminComponent, DialogComponent]
})
export class SharedModule { }
