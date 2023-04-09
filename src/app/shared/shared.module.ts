import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

import { LoadersComponent } from './components/loaders/loaders.component';
import { FooterPageComponent } from './components/footer-page/footer-page.component';

@NgModule({
  declarations: [
    LoadersComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    RouterModule
  ],
  exports: [
    LoadersComponent,
    FooterPageComponent,
    PaginatorModule
  ]
})
export class SharedModule { }
