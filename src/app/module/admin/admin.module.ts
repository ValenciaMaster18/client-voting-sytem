import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { AprendizAdminModule } from './components/aprendiz/aprendiz-admin.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
// Components
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';


@NgModule({
  declarations: [
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    AprendizAdminModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [HomeAdminComponent]
})
export class AdminModule { }
