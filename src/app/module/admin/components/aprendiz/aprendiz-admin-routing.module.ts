import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApprenticesComponent } from './add-apprentices/add-apprentices.component';
import { CsvApprenticesComponent } from './csv-apprentices/csv-apprentices.component';
import { ViewApprenticesComponent } from './view-apprentices/view-apprentices.component';

const routes: Routes = [
  {
    path: '', component: ViewApprenticesComponent
  },
  {
    path: 'add', component: AddApprenticesComponent
  },
  {
    path: 'csv', component: CsvApprenticesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprendizAdminRoutingModule { }
