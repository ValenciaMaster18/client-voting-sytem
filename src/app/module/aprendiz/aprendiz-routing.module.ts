import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AprendizComponent } from './pages/aprendiz/aprendiz.component';
import { VotacionAprendizComponent } from './components/votacion-aprendiz/votacion-aprendiz.component';

const routes: Routes = [
  {
    path: '',
    component: AprendizComponent,
    children: [
      {
        path: '',
        redirectTo: 'votaciones',
        pathMatch: 'full'
      },
      {
        path: 'votaciones',
        component: VotacionAprendizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprendizRoutingModule { }
