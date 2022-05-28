import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isLoginFormOpenSub = new Subject();
  onLoginFormOpen = this.isLoginFormOpenSub.asObservable();


  constructor() { }
}
