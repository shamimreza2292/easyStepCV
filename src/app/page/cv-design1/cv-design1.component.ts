import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DownloadComponent } from 'src/app/common/download/download.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { BasicInformationFormComponent } from 'src/app/user-input-forms/basic-information-form/basic-information-form.component';
import { EducationFormComponent } from 'src/app/user-input-forms/education-form/education-form.component';
import { ObjectiveFormComponent } from 'src/app/user-input-forms/objective-form/objective-form.component';
import { PersonalDetailsComponent } from 'src/app/user-input-forms/personal-details/personal-details.component';
import { ReferenceFormComponent } from 'src/app/user-input-forms/reference-form/reference-form.component';
import { SkillsFormComponent } from 'src/app/user-input-forms/skills-form/skills-form.component';
import { WorkExperienceFormComponent } from 'src/app/user-input-forms/work-experience-form/work-experience-form.component';



@Component({
  selector: 'app-cv-design1',
  templateUrl: './cv-design1.component.html',
  styleUrls: ['./cv-design1.component.css']
})
export class CvDesign1Component implements OnInit, OnDestroy {
  // isLoginFormOpen: boolean = false
  isLoggedIn: boolean = false;
  subscribes = [];

@ViewChild('basicInformationFormModal', {static: false}) basicInformationFormModal: BasicInformationFormComponent;
@ViewChild('objectiveFormModal', {static: false}) objectiveFormModal: ObjectiveFormComponent;
@ViewChild('workExperienceModal', {static: false}) workExperienceModal: WorkExperienceFormComponent;
@ViewChild('personalDetailsFormModal', {static: false}) personalDetailsFormModal: PersonalDetailsComponent;
@ViewChild('skillFormModal', {static: false}) skillFormModal: SkillsFormComponent;
@ViewChild('educationFormModal', {static: false}) educationFormModal:  EducationFormComponent;
@ViewChild('referenceFormModal', {static: false}) referenceFormModal:  ReferenceFormComponent;


  basicInformations = [];
  basicInfoData = null;
  workExperienceData: any;
  skilsData: any;
  educations: any;
  references: any[] = [];
  isCvOnEditMode: boolean = false;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private dataService: DataService,
    public dateTimeService: DateTimeService
  ) { }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(){
    this.dataService.isCvOnEditMode = false;
    this.unSubscribe();
  }

  subscribe(){
    let onloggedIn = this.authService.onloggedIn.subscribe(data=>{
      // this.isLoggedIn = true;
    });
    this.subscribes.push(onloggedIn);
    let onlogout = this.authService.onlogout.subscribe(data=>{
      // this.isLoggedIn = false;
      this.isCvOnEditMode = false;
      this.dataService.isCvOnEditMode = false;

      this.resetLoginData();
    });
    this.subscribes.push(onlogout);

    let onClickEidtCv = this.dataService.onEditCv.subscribe((data: boolean)=>{
      this.isCvOnEditMode = data;
    })
    this.subscribes.push(onClickEidtCv);
    let onDownloadBtnSub = this.dataService.onDownloadBtnSub.subscribe((data: boolean)=>{
      this.isCvOnEditMode = false;
      this.dataService.isCvOnEditMode = false;
    })
    this.subscribes.push(onDownloadBtnSub);


    let oncontactMe =  this.dataService.oncontactMe.subscribe((basicInfoData)=>{
      this.basicInfoData = basicInfoData;
    });
    this.subscribes.push(oncontactMe);

    let onPostWorkExperience = this.dataService.ongetWorkExperience.subscribe((exData)=>{
      if(exData){
        this.workExperienceData = exData['data'].experience;
      }
    });
    this.subscribes.push(onPostWorkExperience);

    let ongetSkil = this.dataService.onGetSkil.subscribe(skillData=>{
      this.skilsData = skillData['data'].skills;
    });
    this.subscribes.push(ongetSkil);
    let onGetEducation = this.dataService.onGetEducation.subscribe(data=>{
      if(!data) return; 
      this.educations = data['data'].educations;
    });
    this.subscribes.push(onGetEducation);

    let onGetReference = this.dataService.onGetReference.subscribe(data=>{
      if(!data) return; 
      this.references = data['data'].references;
    });
    this.subscribes.push(onGetReference);

  }

  unSubscribe(){
    this.subscribes.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }

  openBasicInformationForm(basicInfoData){
    this.basicInformationFormModal.openEditForm(basicInfoData)
  }

  resetLoginData(){
    this.basicInfoData = null;
    this.workExperienceData = null;
    this.skilsData = null;
  }



  // objective create or edit
  onObjectiveCreateOrEdit(){
    this.objectiveFormModal.open();
  }

  // workExperienceModal create or edit

  onworkExperienceEdit(experienceData){
    this.workExperienceModal.openEditForm(experienceData);
  }
  onworkExperienceCreate(){
    this.workExperienceModal.openCreateForm();
  }

  // peronal details form

  openPersonalDetailsForm(){
    this.personalDetailsFormModal.open();
  }

  // skill form
  onSkillCreate(){
    this.skillFormModal.openCreateSkillform();
  }
  onSkillEdit(skillData){
    this.skillFormModal.openEditSkilform(skillData);
  }


  // education form
  onCreateEducation(){
    this.educationFormModal.openCreateEducationForm();
  }
  onEditEducation(education){
    this.educationFormModal.openEditEducationForm(education);
  }


// reference form
  onCreateReference(){
    this.referenceFormModal.openCreateReferenceForm();
  }
  onEditReference(refData){
    this.referenceFormModal.openEditReferenceForm(refData);
  }
 



}
