import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'doc-design1',
  templateUrl: './doc.design1.component.html',
  styleUrls: ['./doc.design1.component.css']
})
export class DocDesign1Component implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  subscribes = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(){
    this.unSubscribe();
  }

  subscribe(){
    let onloggedIn = this.authService.onloggedIn.subscribe(data=>{
      this.isLoggedIn = true;

    });
    this.subscribes.push(onloggedIn);

  }

  unSubscribe(){
    this.subscribes.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }





}
