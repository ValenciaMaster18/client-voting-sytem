// Decorador
import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { AdminRoutingModule  } from './admin.routing.module';

import { AprendizAdminModule } from './components/aprendiz/aprendiz-admin.module';
import { CandidatosAdminModule } from './components/candidatos/candidatos-admin.module';
import { VotacionesAdminModule } from './components/votaciones/votaciones-admin.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Mis Module
    AprendizAdminModule,
    CandidatosAdminModule,
    VotacionesAdminModule,
    SharedModule,
    // Modulo para hacer peticiones http
    HttpClientModule,
    // Modulos de @angular/material
    MatDialogModule,
    // Modulo para hacer routing
    AdminRoutingModule
  ],
  // Para que sea visible en otros module los componentes
  exports: []
})
export class AdminModule { }
