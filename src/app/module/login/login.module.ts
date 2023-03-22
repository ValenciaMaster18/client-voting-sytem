import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./components/login/login-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule{}
