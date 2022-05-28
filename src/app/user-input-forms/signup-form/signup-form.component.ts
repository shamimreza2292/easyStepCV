import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;

  user = {
    email: null,
    password: null
  }

  @Input('isSignupModalOpen')
  set onSignupModalOpen(value: boolean){
    if(value){
      this.openSignupModal();
    }
  } 

  @Output() isSignupModalClose = new EventEmitter();

  @ViewChild('signupModal') signupModal: ModalComponent;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      // name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],
    })

  }

  openSignupModal(){
    this.signupModal.open();
  }


  signup(form: NgForm){
    if(this.signupForm.invalid) return;
    this.user.email = form['email'];
    this.user.password = form['password'];  
    this.authService.createUser(this.user);
    this.closeLoginModal();
  }

  closeLoginModal(){
    this.signupModal.close();
    this.isSignupModalClose.emit(false);
  }






}
