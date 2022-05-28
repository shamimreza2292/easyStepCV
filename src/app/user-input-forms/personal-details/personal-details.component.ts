import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'personal-details-form',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {

  personalDetailsForm: FormGroup;
  personalDetailsObj = {
    fatherName: null,
    motherName: null,
    dateOfBirth: null,
    gender: null,
    nationality: null,
    religion: null,
    currentLocation: null,
    maritalStatus: null,
  };
  @ViewChild('personalFormModal', {static: false}) personalFormModal: ModalComponent;
  subscribs: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dataService: DataService

  ) { }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      fatherName: [null, [Validators.required]],
      motherName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      religion: [null, [Validators.required]],
      currentLocation: [null, [Validators.required]],
      maritalStatus: [null, [Validators.required]],
    })
    this.subscription();
  }


  ngOnDestroy(){
    this.subscribs.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }


  onpersonalDetailsFormSubmit(form: NgForm){
    if(this.personalDetailsForm.invalid) return;
    this.personalDetailsObj.fatherName = form['fatherName'];
    this.personalDetailsObj.motherName = form['motherName'];
    this.personalDetailsObj.dateOfBirth = form['dateOfBirth'];
    this.personalDetailsObj.gender = form['gender'];
    this.personalDetailsObj.nationality = form['nationality'];
    this.personalDetailsObj.religion = form['religion'];
    this.personalDetailsObj.currentLocation = form['currentLocation'];
    this.personalDetailsObj.maritalStatus = form['maritalStatus'];
    this.dataService.postPersonalInformation(this.personalDetailsObj); 
    this.closePersonalDetailsModal();
  }



  subscription(){
    let oncontactMe = this.dataService.oncontactMe.subscribe((data)=>{
      if(data){
        this.personalDetailsForm.patchValue ({
          fatherName: data['data'].fatherName,
          motherName:  data['data'].motherName,
          dateOfBirth:  data['data'].dateOfBirth,
          gender:  data['data'].gender,
          nationality:  data['data'].nationality,
          religion:  data['data'].religion,
          currentLocation:  data['data'].currentLocation,
          maritalStatus:  data['data'].maritalStatus,
        })
      }
    });
    this.subscribs.push(oncontactMe);
  }


  resetform(){
     this.personalDetailsForm.patchValue ({
          fatherName: null,
          motherName: null,
          dateOfBirth: null,
          gender: null,
          nationality: null,
          religion: null,
          currentLocation: null,
          maritalStatus: null,
        })
  }


  open(){
    this.personalFormModal.open();
    this.dataService.getPersonalInformation();
  }

  closePersonalDetailsModal(){ 
    this.personalFormModal.close();
    this.resetform();
  }



}
