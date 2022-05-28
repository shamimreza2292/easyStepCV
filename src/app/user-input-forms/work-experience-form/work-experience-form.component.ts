import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.css']
})
export class WorkExperienceFormComponent implements OnInit {
  workExperienceForm: FormGroup;
  workExperienceObj = {
    id: null,
    companyName: null,
    designation: null,
    responsibilities: null,
    startDate: null,
    endDate: null,
    continuing: null
  };
  subscribs: any[] = [];

  @ViewChild('workExperienceModal', {static: false}) workExperienceModal: ModalComponent;
  isCountinueWork: boolean = false;

  
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit(): void {
    this.workExperienceForm = this.fb.group({
      companyName: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      responsibilities: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      continuing: [null],
    });
    this.subscription();
  }
  ngOnDestroy(){
    this.subscribs.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }

  onworkExperienceFormSubmit(form: NgForm){
    if(this.workExperienceForm.invalid) return;
    this.workExperienceObj.companyName = form['companyName']
    if(form['continuing'] == true){
      this.workExperienceObj.continuing = form['continuing'];
      this.workExperienceObj.endDate = null;
    }else{
      this.workExperienceObj.endDate = form['endDate']
      this.workExperienceObj.continuing = false;
    }
    this.workExperienceObj.designation = form['designation']
    this.workExperienceObj.responsibilities = form['responsibilities']
    this.workExperienceObj.startDate = form['startDate']
    this.dataService.postWorkExperience(this.workExperienceObj);
    this.closeWorkExperienceModal();
  }

  subscription(){
   
 


  }

  openCreateForm(){
    this.workExperienceModal.open();
  }

  openEditForm(workExperienceData){
    this.workExperienceModal.open();
    this.workExperienceObj.id = workExperienceData._id;
    this.workExperienceForm.patchValue ({
      companyName:  workExperienceData.companyName,
      designation:  workExperienceData.designation,
      responsibilities:  workExperienceData.responsibilities,
      startDate:  this.dateTimeService.formDateFormatYYMMDD(workExperienceData.startDate),
      endDate: this.dateTimeService.formDateFormatYYMMDD(workExperienceData.endDate),
      continuing:  workExperienceData.continuing,
    })
  }

  closeWorkExperienceModal(){
    this.workExperienceModal.close();
    this.resetForm();
  }


  onContinueCheckBoxClick(event){
    this.isCountinueWork = event.target.checked ?  true : false;    
  }

  resetForm(){
    this.workExperienceObj.id = null;
    this.workExperienceForm.patchValue ({
      companyName: null,
      designation: null,
      responsibilities: null,
      startDate: null,
      endDate:null,
      continuing: null
    })
  }


}
