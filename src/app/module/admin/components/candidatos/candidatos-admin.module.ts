import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';



@NgModule({
  declarations: [
    AddCandidatesComponent,
    ViewCandidatesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CandidatosAdminModule { }
