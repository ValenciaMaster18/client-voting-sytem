import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoadersComponent } from './components/loaders/loaders.component';

@NgModule({
  declarations: [
    HeaderAdminComponent,
    DialogComponent,
    LoadersComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [HeaderAdminComponent, DialogComponent,LoadersComponent]
})
export class SharedModule { }
