import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddApprenticesComponent } from "./components/aprendiz/add-apprentices/add-apprentices.component";
import { CsvApprenticesComponent } from "./components/aprendiz/csv-apprentices/csv-apprentices.component";
import { ViewApprenticesComponent } from "./components/aprendiz/view-apprentices/view-apprentices.component";
import { AddCandidatesComponent } from "./components/candidatos/add-candidates/add-candidates.component";
import { ViewCandidatesComponent } from "./components/candidatos/view-candidates/view-candidates.component";
import { AddVotingComponent } from "./components/votaciones/add-voting/add-voting.component";
import { ViewVotingComponent } from "./components/votaciones/view-voting/view-voting.component";

const routes: Routes = [
  { path: '', children: [
    { path: 'aprendiz', component: ViewApprenticesComponent  },
    { path: 'aprendiz/add', component: AddApprenticesComponent },
    { path: 'aprendiz/csv', component: CsvApprenticesComponent },
    { path: 'candidato', component: ViewCandidatesComponent },
    { path: 'candidato/add', component: AddCandidatesComponent },
    { path: 'votacion', component: ViewVotingComponent },
    { path: 'votacion/add', component: AddVotingComponent },
    { path: '**', redirectTo: 'aprendiz', pathMatch: 'full' }
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
