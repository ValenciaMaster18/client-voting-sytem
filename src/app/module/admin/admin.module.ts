// Decorador
import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { AprendizAdminModule } from './components/aprendiz/aprendiz-admin.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule  } from './admin.routing.module';
import { MatDialogModule } from '@angular/material/dialog';
// Components
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ViewCandidatesComponent } from './components/candidatos/view-candidates/view-candidates.component';
import { CandidatosAdminModule } from './components/candidatos/candidatos-admin.module';


@NgModule({
  declarations: [
    // Componentes
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    // Mis Module
    AprendizAdminModule,
    CandidatosAdminModule,
    SharedModule,
    // Modulo para hacer peticiones http
    HttpClientModule,
    // Modulos de @angular/material
    MatDialogModule,
    // Modulo para hacer routing
    AdminRoutingModule
  ],
  // Para que sea visible en otros module los componentes
  exports: [HomeAdminComponent]
})
export class AdminModule { }
