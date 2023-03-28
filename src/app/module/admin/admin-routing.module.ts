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
        loadChildren: () => import('./components/aprendiz/aprendiz-admin.module').then(m => m.AprendizAdminModule),
        // data: {
        //   preload: true
        // }
      },
      {
        path: 'candidato',
        loadChildren: () => import('./components/candidatos/candidatos-admin.module').then(m => m.CandidatosAdminModule),
        // data: {
        //   preload: true
        // }
      },
      {
        path: 'votacion',
        loadChildren: () => import('./components/votaciones/votaciones-admin.module').then(m => m.VotacionesAdminModule),
        // data: {
        //   preload: true
        // }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
