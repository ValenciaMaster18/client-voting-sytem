import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AddVotingComponent } from './add-voting/add-voting.component';
import { ViewVotingComponent } from './view-voting/view-voting.component';

@NgModule({
  declarations: [
    AddVotingComponent,
    ViewVotingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class VotacionesAdminModule { }
