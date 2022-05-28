import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  //  use class of user
  userInfo = { 
    email: null,
    password: null
  }

  @ViewChild('loginModal') loginModal: ModalComponent;

  @Input('isOpenLoginForm')
  set onLoginFormOpen(value: boolean){
    if(value){
      this.openLoginModal();
    }
  }

  @Output() isLoginFormClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
 
    this.loginForm = this.fb.group({
      "email": [null, [Validators.required]],
      "password": [null, [Validators.required]]
     })

  }


  openLoginModal(){
    this.loginModal.open();
   }
   closeLoginModal(){
     this.loginModal.close();
     this.isLoginFormClose.emit(false);
   }

   lonin(form: NgForm){
    if(this.loginForm.invalid) return;
      this.userInfo.email = form['email'];
      this.userInfo.password = form['password'];
      this.authService.loginWithJwt(this.userInfo);
      this.closeLoginModal();
   }


}
