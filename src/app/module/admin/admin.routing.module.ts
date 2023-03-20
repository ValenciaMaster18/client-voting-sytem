import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddApprenticesComponent } from "./components/aprendiz/add-apprentices/add-apprentices.component";
import { CsvApprenticesComponent } from "./components/aprendiz/csv-apprentices/csv-apprentices.component";
import { ViewApprenticesComponent } from "./components/aprendiz/view-apprentices/view-apprentices.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'aprendiz' },
  { path: 'aprendiz', component: ViewApprenticesComponent  },
  { path: 'aprendiz/add', component: AddApprenticesComponent },
  { path: 'aprendiz/csv', component: CsvApprenticesComponent },
  { path: '**', redirectTo: 'aprendiz', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
