import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadersComponent } from './components/loaders/loaders.component';
import { RouterModule } from '@angular/router';
import { FooterPageComponent } from './components/footer-page/footer-page.component';

@NgModule({
  declarations: [
    LoadersComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LoadersComponent,
    FooterPageComponent
  ]
})
export class SharedModule { }
