import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'aprendiz',
    loadChildren: () => import('./module/admin/components/aprendiz/aprendiz-admin.module').then(
      m => m.AprendizAdminModule
    )
  },
  {
    path: 'candidato',
    loadChildren: () => import('./module/admin/components/candidatos/candidatos-admin.module').then(
      m => m.CandidatosAdminModule
    )
  },
  {
    path: 'votacion',
    loadChildren: () => import('./module/admin/components/votaciones/votaciones-admin.module').then(
      m => m.VotacionesAdminModule
    )
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
