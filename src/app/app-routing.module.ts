import { NgModule } from '@angular/core';
// Estrategias de precarga
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { CustomPreloadService } from './services/precarga/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
// Guards
import { LoginGuardAdmin } from './guards/login/login-admin.guard';
import { LoginGuardUser } from './guards/login/login-user.guard';
import { RedirectLogin } from './guards/login/redirect-login.guatd';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(
      m => m.LoginModule
    ),
    canActivate: [RedirectLogin],
    title: 'Login | Sistema de Votaciones'
    // data: {
    //   preload: true
    // }
  },
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(
      m => m.AdminModule
    ),
    canActivate: [LoginGuardAdmin],
    title: 'Administrador | Sistema de Votaciones'
  },
  {
    path: 'usuario',
    loadChildren: () => import('./module/aprendiz/aprendiz.module').then(
      m => m.AprendizModule
    ),
    canActivate: [LoginGuardUser],
    title: 'Usuario | Sistema de Votaciones'
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Habilitamos la precarga de los modulos: Usar esta tecnica cuando sean pocos modulos a precargar
    // preloadingStrategy: PreloadAllModules
    // Precarga personalizada
    // preloadingStrategy: CustomPreloadService
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
