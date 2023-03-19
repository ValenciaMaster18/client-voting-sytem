import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Componentes
import { AddApprenticesComponent } from './add-apprentices/add-apprentices.component';
import { ViewApprenticesComponent } from './view-apprentices/view-apprentices.component';

@NgModule({
  declarations: [
    AddApprenticesComponent,
    ViewApprenticesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ViewApprenticesComponent]
})
export class AprendizAdminModule { }
