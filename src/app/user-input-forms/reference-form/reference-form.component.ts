import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.css']
})
export class ReferenceFormComponent implements OnInit {

  referenceForm: FormGroup;

  referenceFormObj = {
    id: null,
    name: null,
    designation: null,
    organizationName: null,
  }
  @ViewChild('referenceForomModal') referenceForomModal: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.referenceForm = this.fb.group({
      name: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      organizationName: [null, [Validators.required]],
    });
  }
 

  submitReferenceForm(form: NgForm){
    if(this.referenceForm.invalid) return;
    this.referenceFormObj.name = form['name'];
    this.referenceFormObj.designation = form['designation'];
    this.referenceFormObj.organizationName = form['organizationName'];
    this.dataService.postReference(this.referenceFormObj);
    this.closeReferenceFormModal();

    // this.close();
  }



  openCreateReferenceForm(){
    this.referenceForomModal.open();
  }

  openEditReferenceForm(refItem){
    if(!refItem) return;
        this.referenceFormObj.id = refItem._id;
        this.referenceForm.patchValue({
          name: refItem.name,
          designation: refItem.designation,
          organizationName: refItem.organizationName
        })
      this.referenceForomModal.open();
  }


  closeReferenceFormModal(){
    this.referenceForomModal.close();
    this.resetReferenceForm();
  }


  resetReferenceForm(){
    this.referenceForm.controls['name'].setValue(null);
    this.referenceForm.controls['designation'].setValue(null);
    this.referenceForm.controls['organizationName'].setValue(null);

    // this.referenceFormObj.id = null;
    this.referenceFormObj.name = null;
    this.referenceFormObj.designation = null;
    this.referenceFormObj.organizationName = null;
  }


}
