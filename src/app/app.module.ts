import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuicklinkModule } from 'ngx-quicklink';

import { AppComponent } from './app.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuicklinkModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
