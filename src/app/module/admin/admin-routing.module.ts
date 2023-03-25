import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'aprendiz',
        pathMatch: 'full'
      },
      {
        path: 'aprendiz',
        loadChildren: () => import('./components/aprendiz/aprendiz-admin.module').then(m => m.AprendizAdminModule)
      },
      {
        path: 'candidato',
        loadChildren: () => import('./components/candidatos/candidatos-admin.module').then(m => m.CandidatosAdminModule)
      },
      {
        path: 'votacion',
        loadChildren: () => import('./components/votaciones/votaciones-admin.module').then(m => m.VotacionesAdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
