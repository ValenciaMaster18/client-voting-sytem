import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { LoginGuard } from './guards/login/login.guard';
import { RedirectLoginGuard } from './guards/redirect-login/redirect-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(
      m => m.LoginModule
    ),
    canActivate: [RedirectLoginGuard]
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
