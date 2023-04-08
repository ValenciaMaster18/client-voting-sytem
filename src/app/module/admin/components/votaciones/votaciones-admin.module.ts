import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotacionesAdminRoutingModule } from './votaciones-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';
// Components
import { AddVotingComponent } from './add-voting/add-voting.component';
import { ViewVotingComponent } from './view-voting/view-voting.component';
import { EstadisticasVotingComponent } from './view-voting/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AddVotingComponent,
    ViewVotingComponent,
    EstadisticasVotingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VotacionesAdminRoutingModule,
    ChartModule,
    SharedModule
  ],
  exports: [AddVotingComponent,ViewVotingComponent]
})
export class VotacionesAdminModule { }
