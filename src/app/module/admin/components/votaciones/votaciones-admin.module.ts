import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
// Components
import { AddVotingComponent } from './add-voting/add-voting.component';
import { ViewVotingComponent } from './view-voting/view-voting.component';

@NgModule({
  declarations: [
    AddVotingComponent,
    ViewVotingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VotacionesAdminModule { }
