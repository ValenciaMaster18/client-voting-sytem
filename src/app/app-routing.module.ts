import { NgModule } from '@angular/core';
// Estrategias de precarga
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { CustomPreloadService } from './services/precarga/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
// Guards
import { LoginGuard } from './guards/login/login.guard';
import { RedirectLoginGuard } from './guards/redirect-login/redirect-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(
      m => m.LoginModule
    ),
    canActivate: [RedirectLoginGuard],
    // data: {
    //   preload: true
    // }
  },
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(
      m => m.AdminModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'admin'
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
