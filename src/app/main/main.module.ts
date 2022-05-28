import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanalNavComponent } from '../navigation/left.panal.nav/left.panal.nav.component';
import { MainComponent } from './main.component';
import { CvDesign1Component } from '../page/cv-design1/cv-design1.component';
import { RouterRoutingModule } from '../router/router-routing.module';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from '../user-input-forms/login-form/login-form.component';
import { ModalService } from '../shared/modal/modal.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupFormComponent } from '../user-input-forms/signup-form/signup-form.component';
import { BasicInformationFormComponent } from '../user-input-forms/basic-information-form/basic-information-form.component';
import { ObjectiveFormComponent } from '../user-input-forms/objective-form/objective-form.component';
import { WorkExperienceFormComponent } from '../user-input-forms/work-experience-form/work-experience-form.component';
import { PersonalDetailsComponent } from '../user-input-forms/personal-details/personal-details.component';
import { SkillsFormComponent } from '../user-input-forms/skills-form/skills-form.component';
import { EducationFormComponent } from '../user-input-forms/education-form/education-form.component';
import { DownloadComponent } from '../common/download/download.component';
import { CvDesign2Component } from '../page/cv-design2/cv-design2.component';
import { ReferenceFormComponent } from '../user-input-forms/reference-form/reference-form.component';

const ALL_COMPONENTS = [
  ModalComponent,


  MainComponent,
  LeftPanalNavComponent,
  CvDesign1Component,
  LoginFormComponent,
  SignupFormComponent,
  ObjectiveFormComponent,
  BasicInformationFormComponent,
  WorkExperienceFormComponent,
  PersonalDetailsComponent,
  SkillsFormComponent,
  EducationFormComponent,
  DownloadComponent
]


@NgModule({
  declarations: [
    ALL_COMPONENTS,
    CvDesign2Component,
    ReferenceFormComponent,
    
    
  ],
  imports: [
    CommonModule,
    // RouterModule,
    RouterRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  exports: [
    ALL_COMPONENTS,

  ],

})
export class MainModule { }
 