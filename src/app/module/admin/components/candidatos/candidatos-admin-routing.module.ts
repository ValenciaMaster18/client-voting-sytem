import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';

const routes: Routes = [
  {
    path: '', component: ViewCandidatesComponent
  },
  {
    path: 'add', component: AddCandidatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatosAdminRoutingModule{}
