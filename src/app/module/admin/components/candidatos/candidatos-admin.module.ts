import { NgModule } from '@angular/core';
// Module
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";
// Components
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';



@NgModule({
    declarations: [
        AddCandidatesComponent,
        ViewCandidatesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class CandidatosAdminModule { }
