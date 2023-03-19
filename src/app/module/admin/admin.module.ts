import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { AprendizAdminModule } from './components/aprendiz/aprendiz-admin.module';
import { HttpClientModule } from '@angular/common/http';
// Components
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';


@NgModule({
  declarations: [
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    AprendizAdminModule,
    HttpClientModule
  ],
  exports: [HomeAdminComponent]
})
export class AdminModule { }
