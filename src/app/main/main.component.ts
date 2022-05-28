import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { asBlob } from 'html-docx-js-typescript'
// if you want to save the docx file, you need import 'file-saver'
import { saveAs } from 'file-saver'
import { ModalService } from '../shared/modal/modal.service';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DownloadService } from '../services/download.service';
import { DownloadComponent } from '../common/download/download.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'main-container',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewChecked, OnDestroy {
  // isLogedInUser: boolean = false;



  @ViewChild('leftPanel', {static: false}) leftPanel: ElementRef;
  @ViewChild('mainbody', {static: false}) mainbody: ElementRef;
  @ViewChild('cvDownloadModal', {static: false}) cvDownloadModal:  DownloadComponent;

  isLoginFormOpen: boolean = false;
  isSignupFormOpen: boolean = false;
  isLoggedIn: boolean = false;
  subscribes = [];
  isEditcv: boolean = false;
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router,
    private downloadService: DownloadService,
    public dataService: DataService
  ) { 
    

  }

  ngOnInit(): void {
    this.subscribe();
  }

  ngAfterViewChecked(){    
    let leftPanelWidth = this.leftPanel.nativeElement.clientWidth;
    let mainbodyWidth = this.mainbody.nativeElement.clientWidth;
    let windowWidth = window.innerWidth;
    if(mainbodyWidth && leftPanelWidth){
      let leftpanelLeftPosition =  ((windowWidth - mainbodyWidth) /2) - leftPanelWidth;
      this.leftPanel.nativeElement.setAttribute('style', 'left:' + (leftpanelLeftPosition <= 0 ? 0 : leftpanelLeftPosition )  +'px;');
    }
  }

  ngOnDestroy(){
    this.unSubscribe();
  }


  subscribe(){
    let onloggedIn = this.authService.onloggedIn.subscribe(data=>{
      this.isLoggedIn = true;
    });
    this.subscribes.push(onloggedIn);

    let onlogout = this.authService.onlogout.subscribe(data=>{
      this.isLoggedIn = false;
    });
    this.subscribes.push(onlogout);

    // get route info
   let routeInfo = this.router.events.subscribe((val) => {
     if(val["url"] != undefined){
       let cvIdName = val["url"].split('/');
       this.downloadService.downloadTemplateId = cvIdName[1];
      }
    })
    this.subscribes.push(routeInfo);

  }

  unSubscribe(){
    this.subscribes.map((sub: Subscription)=>{
      sub.unsubscribe();
    })
  }


  onLoginBtnClick(){
    // this.modalService.isLoginFormOpenSub.next();
    this.isLoginFormOpen = true;
  }


  isLoginFormClose(){
    this.isLoginFormOpen = false;
  }


  onSignupModalOpen(){
    this.isSignupFormOpen = true;
  }

  onSignupModalClose(){
    this.isSignupFormOpen = false;
  }

  onLogoutButtonClick(){
    this.authService.logout();
  }


  // open download modal

  opemDownloadModal(){
    this.cvDownloadModal.openDownloadModal();  
    this.dataService.onClickDownloadBtn();
  }

  // edit cv
  onEditCv(){
    this.dataService.onClickEidtCv();
  }





  

}
