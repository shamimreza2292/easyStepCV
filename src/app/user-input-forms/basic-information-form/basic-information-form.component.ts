import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss']
})
export class BasicInformationFormComponent implements OnInit {

  basicInformationForm: FormGroup; 

  basicInformationFormObj = {
    name: null,
    email: null,
    phoneNumber: null,
    profileImage: null,
    address: null,
    objective: null
  }

  @ViewChild('basicInformationForomModal', {static: false}) basicInformationForomModal: ModalComponent;
  selectedImageUrl: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.basicInformationForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      profileImage: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

 

  submitBasicForm(form: NgForm){
    if(this.basicInformationForm.invalid) return;
    this.basicInformationFormObj.name = form['name'];
    this.basicInformationFormObj.email = form['email'];
    this.basicInformationFormObj.phoneNumber = form['phoneNumber'];
    this.basicInformationFormObj.address = form['address'];
    this.basicInformationFormObj.profileImage = form['profileImage'];
    this.dataService.postPersonalInformation(this.basicInformationFormObj);
    this.close();
  }



  openEditForm(basicInfoData){
    this.basicInformationForomModal.open();
    // this.dataService.getPersonalInformation();
    this.basicInformationForm.patchValue ({
            name: basicInfoData.data.name,  
            email: basicInfoData.data.email,
            phoneNumber: basicInfoData.data.phoneNumber,
            profileImage: basicInfoData.data.profileImage,
            address: basicInfoData.data.address
          });
    this.selectedImageUrl = basicInfoData['data'].profileImage;
  }

  close(){
    this.basicInformationForomModal.close();
    this.resetForm();
  }




  onFileChange(event){
    this.basicInformationForm.patchValue ({
      profileImage: event.target.value
    })
    this.selectedImageUrl = event.target.value;
  }

  resetForm(){
    this.basicInformationForm.patchValue ({
      name: null,
      email: null,
      phoneNumber: null,
      profileImage: null,
      address: null
    })
  }
  

}
