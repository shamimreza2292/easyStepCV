import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { NameAndDesignationComponent } from './page/name-and-designation/name-and-designation.component';
import { AwardsComponent } from './page/awards/awards.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { authInterceptor } from './services/auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocDesign1Component } from './shared/doc.design1/doc.design1.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { RouterRoutingModule } from './router/router-routing.module';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerService } from './shared/spinner/spinner.service';

@NgModule({
  declarations: [
    AppComponent,
    // NameAndDesignationComponent,
    // AboutAndContactComponent,
    // WorkExperienceComponent,
    // EducationComponent,
    // AwardsComponent,
    // SkilComponent,
    // ContactMeComponent,
    DocDesign1Component,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    MainModule,
    RouterModule ,
    NgCircleProgressModule.forRoot({
      // set defaults here
       
    }),
    RouterRoutingModule
  ], 

 
  providers: [
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: authInterceptor,
    //   multi: true
    // },
  ],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
