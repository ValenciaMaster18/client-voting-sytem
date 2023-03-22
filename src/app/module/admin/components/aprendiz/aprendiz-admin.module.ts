import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AprendizAdminRoutingModule } from './aprendiz-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// Componentes
import { AddApprenticesComponent } from './add-apprentices/add-apprentices.component';
import { ViewApprenticesComponent } from './view-apprentices/view-apprentices.component';
import { CsvApprenticesComponent } from './csv-apprentices/csv-apprentices.component';

@NgModule({
  declarations: [
    AddApprenticesComponent,
    ViewApprenticesComponent,
    CsvApprenticesComponent
  ],
  imports: [
    CommonModule,
    AprendizAdminRoutingModule,
    // Formularios y direcitavas ngModel
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AprendizAdminModule { }
