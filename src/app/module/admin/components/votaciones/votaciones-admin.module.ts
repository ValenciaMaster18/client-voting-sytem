import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotacionesAdminRoutingModule } from './votaciones-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
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
    ReactiveFormsModule,
    FormsModule,
    VotacionesAdminRoutingModule,
    SharedModule
  ],
  exports: [AddVotingComponent,ViewVotingComponent]
})
export class VotacionesAdminModule { }
