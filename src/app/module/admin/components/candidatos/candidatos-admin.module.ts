import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Components
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';



@NgModule({
  declarations: [
    AddCandidatesComponent,
    ViewCandidatesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CandidatosAdminModule { }
