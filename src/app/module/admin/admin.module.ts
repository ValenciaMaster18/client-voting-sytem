import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';


@NgModule({
  declarations: [
    HomeAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
