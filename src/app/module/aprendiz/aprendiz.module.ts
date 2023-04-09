import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprendizRoutingModule } from './aprendiz-routing.module';
import { HeaderAprendizComponent } from './components/header-aprendiz/header-aprendiz.component';
import { VotacionAprendizComponent } from './components/votacion-aprendiz/votacion-aprendiz.component';
import { AprendizComponent } from './pages/aprendiz/aprendiz.component';
@NgModule({
  declarations: [
    HeaderAprendizComponent,
    VotacionAprendizComponent,
    AprendizComponent
  ],
  imports: [
    CommonModule,
    AprendizRoutingModule,
  ]
})
export class AprendizModule { }
