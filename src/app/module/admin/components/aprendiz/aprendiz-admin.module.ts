import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Componentes
import { AddApprenticesComponent } from './add-apprentices/add-apprentices.component';
import { ViewApprenticesComponent } from './view-apprentices/view-apprentices.component';

@NgModule({
  declarations: [
    AddApprenticesComponent,
    ViewApprenticesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AprendizAdminModule { }
