import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { QuicklinkModule } from 'ngx-quicklink';

import { AdminComponent } from './page/admin/admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/sidebar/sidebar-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderAdminComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    QuicklinkModule
  ]
})
export class AdminModule { }
