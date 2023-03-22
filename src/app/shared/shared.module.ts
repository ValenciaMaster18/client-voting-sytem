import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadersComponent } from './components/loaders/loaders.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/sidebar/sidebar-admin.component';
import { RouterModule } from '@angular/router';
import { FooterPageComponent } from './components/footer-page/footer-page.component';

@NgModule({
  declarations: [
    DialogComponent,
    LoadersComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    DialogComponent,
    LoadersComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterPageComponent
  ]
})
export class SharedModule { }
