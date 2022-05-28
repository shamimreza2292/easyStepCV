import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'objective-form',
  templateUrl: './objective-form.component.html',
  styleUrls: ['./objective-form.component.css']
})
export class ObjectiveFormComponent implements OnInit {
  
  @ViewChild('objectiveFormModal', {static: false}) objectiveFormModal: ModalComponent;
  objectiveForm: FormGroup;
  objectiveFormObj = {
    name: null,
    email: null,
    phoneNumber: null,
    profileImage: null, 
    address: null,
    objective: null,
  }
  getBasicInformationData: any;
  subscribs: any = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.objectiveForm = this.fb.group({
      objective: [null, [Validators.required]],
    });
    this.subscription();
  }

  ngOnDestroy(){
    this.subscribs.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }
  
  submitObjectiveForm(form: NgForm){
    if(this.objectiveForm.invalid) return;
    if(this.getBasicInformationData){
      this.objectiveFormObj.name = this.getBasicInformationData.data.name;
      this.objectiveFormObj.email = this.getBasicInformationData.data.email;
      this.objectiveFormObj.phoneNumber = this.getBasicInformationData.data.phoneNumber;
      this.objectiveFormObj.address = this.getBasicInformationData.data.address;
      this.objectiveFormObj.profileImage = this.getBasicInformationData.data.profileImage;
      this.objectiveFormObj.objective = form['objective'];
    }else{
      this.objectiveFormObj.objective = form['objective'];
    }
    this.dataService.postPersonalInformation(this.objectiveFormObj);
    this.close();
  }


  // open(){

  // }


  subscription(){
    let oncontactMe = this.dataService.oncontactMe.subscribe((data)=>{
      if(data){
        this.getBasicInformationData = data;
        this.objectiveForm.patchValue ({
          objective: data['data'].objective,
        })
      }
    });
    this.subscribs.push(oncontactMe);
  }


  open(){
    this.objectiveFormModal.open();
    this.dataService.getPersonalInformation();
  }


  close(){
    this.objectiveFormModal.close();
    this.resetForm();
  }

  resetForm(){
    this.objectiveForm.patchValue ({
      objective: null,
    })
  }

}
