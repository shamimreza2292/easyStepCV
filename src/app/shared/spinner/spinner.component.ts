import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  
  @ViewChild('spinner' ) spinner: ElementRef;
  subscribes: any = [];

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.subscribtion();

  }
  ngOnDestroy(){
    this.unSubscribe();
  }


  unSubscribe(){
    this.subscribes.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }


  subscribtion(){
    let onSpinnerShow =  this.spinnerService.onSpinnerShow.subscribe(data=>{
      this.show();
    })
    this.subscribes.push(onSpinnerShow)

    let onSpinnerHide =  this.spinnerService.onSpinnerHide.subscribe(data=>{
      this.hide();
    })
    this.subscribes.push(onSpinnerHide)
    
  }
 
  show(){
    this.spinner.nativeElement.style.display = 'block';
  }

  hide(){
    this.spinner.nativeElement.style.display = 'none';
  }




}
