import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./module/login/login.module').then(
      m => m.LoginModule
    )
  },
  {
    path: 'aprendiz',
    loadChildren: () => import('./module/admin/components/aprendiz/aprendiz-admin.module').then(
      m => m.AprendizAdminModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path: 'candidato',
    loadChildren: () => import('./module/admin/components/candidatos/candidatos-admin.module').then(
      m => m.CandidatosAdminModule
    ),
    canActivate: [LoginGuard]

  },
  {
    path: 'votacion',
    loadChildren: () => import('./module/admin/components/votaciones/votaciones-admin.module').then(
      m => m.VotacionesAdminModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'aprendiz'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
