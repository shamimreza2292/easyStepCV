import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.css']
})
export class SkillsFormComponent implements OnInit {
  skilFrom: FormGroup;
  skilObj={
    id: null,
    skilName: null,
    confidentLavel: null
  }

  @ViewChild('skillFormModal') skillFormModal: ModalComponent;




  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.skilFrom = this.fb.group({
      skilName: [null, [Validators.required]],
      confidentLavel: [null, [Validators.required]]
    });
  }



  onSkilFormSubmit(form: NgForm){
    if(this.skilFrom.invalid) return;
    this.skilObj.skilName = form['skilName'];
    this.skilObj.confidentLavel = form['confidentLavel'];
    // call api function

    this.dataService.postSkil(this.skilObj);
    this.closeSkilForm();
  }

  resetSkilForm(){
    this.skilObj.id = null;
    this.skilFrom.patchValue({
      skilName: null,
      confidentLavel: null
    })
  }



  openCreateSkillform(){
    this.skillFormModal.open();
  }

  openEditSkilform(skillData){
    this.skillFormModal.open();
    this.skilObj.id = skillData._id;
    this.skilFrom.patchValue({
      skilName: skillData.skilName,
      confidentLavel: skillData.confidentLavel
    })
  }

  closeSkilForm(){
    this.resetSkilForm();
    this.skillFormModal.close();
  }





}
