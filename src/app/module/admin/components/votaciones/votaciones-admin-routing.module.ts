import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddVotingComponent } from "./add-voting/add-voting.component";
import { ViewVotingComponent } from "./view-voting/view-voting.component";

const routes: Routes = [
  {
    path: '', component: ViewVotingComponent
  },
  {
    path: 'add', component: AddVotingComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotacionesAdminRoutingModule{}
