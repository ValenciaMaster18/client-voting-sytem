import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuicklinkModule } from 'ngx-quicklink';

import { AppComponent } from './app.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuicklinkModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
