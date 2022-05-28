import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerComponent } from './spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

    isSpinnerShow$ = new Subject(); 
    onSpinnerShow = this.isSpinnerShow$.asObservable();

    isSpinnerHide$ =  new Subject();
    onSpinnerHide = this.isSpinnerHide$.asObservable();


    constructor(
        // public spinnerComponent: SpinnerComponent
    ){

    }

 
    showSpinner(){
        // this.spinnerComponent.show(); // function
    }

    hideSpinner(){
        // this.spinnerComponent.hide();
    }


}