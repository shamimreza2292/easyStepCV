import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {
  
  educationFrom: FormGroup; 
  educationObj = {
    id: null,
    nameOfDegree: null,
    nameOfInstitute: null,
    passingYear: null
  }

  @ViewChild('educationFormModal') educationFormModal: ModalComponent;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.educationFrom = this.fb.group({
      nameOfDegree: [null, [Validators.required]],
      nameOfInstitute: [null, [Validators.required]],
      passingYear: [null, [Validators.required]]
    });
  }

  onEducationFormSubmit(form: NgForm){
    if(this.educationFrom.invalid) return;
    this.educationObj.nameOfDegree = form['nameOfDegree'];
    this.educationObj.nameOfInstitute = form['nameOfInstitute'];
    this.educationObj.passingYear = form['passingYear'];
    // api
    this.dataService.postEducation(this.educationObj);
    this.closeEducationFormModal();
  }


  openCreateEducationForm(){
    this.educationFormModal.open();
  }

  openEditEducationForm(eduItem){
    if(!eduItem) return;
        this.educationObj.id = eduItem._id;
        this.educationFrom.patchValue({
          nameOfDegree: eduItem.nameOfDegree,
          nameOfInstitute: eduItem.nameOfInstitute,
          passingYear: eduItem.passingYear
        })
      this.educationFormModal.open();
  }


  resetEducationForm(){
    this.educationFrom.controls['nameOfDegree'].setValue(null);
    this.educationFrom.controls['nameOfInstitute'].setValue(null);
    this.educationFrom.controls['passingYear'].setValue(null);

    this.educationObj.id = null;
    this.educationObj.nameOfDegree = null;
    this.educationObj.nameOfInstitute = null;
    this.educationObj.passingYear = null;

  }


  closeEducationFormModal(){
    this.educationFormModal.close();
    this.resetEducationForm();
  }



}
