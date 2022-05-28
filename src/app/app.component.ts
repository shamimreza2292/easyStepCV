import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import * as data from '../assets/userData/user.json'
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { ModalComponent } from './shared/modal/modal.component';
import { Subscription } from 'rxjs';

import { asBlob } from 'html-docx-js-typescript'
// if you want to save the docx file, you need import 'file-saver'
import { saveAs } from 'file-saver'


import html2canvas from "html2canvas";
import jsPDF from 'jspdf'
import { async } from '@angular/core/testing';

// declare const html2canvas: any;
// declare const jsPDF: any;
// (window as any).html2canvas = html2canvas;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'curriculum-vitae';
  isToken: boolean;
  // isEditMode: boolean = true;

  loginForm;
  subscription: Subscription[] = [];

  @ViewChild('clossButton', {static: false}) clossButton: ElementRef;
  @ViewChild('cvBody', {static: false}) cvBody: ElementRef;
  @ViewChild('loginModal') loginModal: ModalComponent;
  @ViewChild('DownloadModal') DownloadModal: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private renderer: Renderer2,
    private elm: ElementRef
    ){

  }

   ngOnInit(){
     
     this.loginForm = this.fb.group({
      "email": [null],
      "password": [null]
     })

    this.subscribe();

   }

   ngOnDestroy(){
    this.unsubscribe();
   }


   subscribe(){
    let loninComplete = this.authService.onloggedIn.subscribe(data=>{
        this.loginModal.close()
    })
    this.subscription.push(loninComplete);
   }


  unsubscribe(){
    this.subscription.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

   lonin(form: NgForm){
    let userInfo ={
      email: form['email'],
      password: form['password']
    }

    // this.authService.loginWithJwt('login', userInfo);

   }


   onLogoutButtonClick(){
     this.authService.logout();
   }


   openLoginModal(){
    this.loginModal.open();
   }
   closeLoginModal(){
     this.loginModal.close();
   }



   openDownloadModal(){
    this.DownloadModal.open();
   }


   closeDownloadModal(){
    this.DownloadModal.close();
   }

   onDownloadOkeyBtnClick(){
    // this.cvBody.nativeElement
    // let cvBody = document.getElementById("cvBody");
    
     

  //   html2canvas(this.cvBody.nativeElement).then( (canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     var FILEURI = canvas.toDataURL("image/png");
  //     var doc = new jsPDF("p","mm","a4");
  //     let position = 0;
  //     // doc.addImage(img, 'JPEG', 0, 0, 20, 20);
  //     doc.addImage(FILEURI, 'JPEG', 0, 0, fileWidth, fileHeight)  
  //     doc.save('cv.pdf');
      
  // });

    let PDF = new jsPDF("p","mm","a4");
    PDF.html(this.cvBody.nativeElement,   
    {
      callback:  (doc)=> {
        // doc.save();
        doc.output('dataurlnewwindow');

      },
      // callback: (doc: jsPDF) => { },
    margin: [0 , 0, 20, 0],
    autoPaging: true, // boolean | "slice" | "text"
    // filename?: string,
    // image: HTMLOptionImage,
    // html2canvas?: Html2CanvasOptions,
    // jsPDF?: jsPDF,
    x: 0,
    y: 0,
    width: 208,
    windowWidth: 800,
    // fontFaces?: HTMLFontFace[];
  }

  )

    // let fileWidth = 208;

    //let fileHeight = (canvas.height * fileWidth) / canvas.width;
     
   this.DownloadModal.close();

  }



  docFileDownload(){
    // methods: {
    //   saveDocx() {
    //     asBlob(htmlString).then(data => {
    //       saveAs(data, 'file.docx') // save as docx file
    //     }) // asBlob() return Promise<Blob|Buffer>
    //   },
    // },

    let cvBody = document.getElementById("cvDocxBody").outerHTML;
  // let  htmlString = `<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     <h1>Welcome</h1>
  //   </body>
  //   </html>`

    const data =  asBlob(cvBody, { orientation: 'landscape', margins: { top: 100 } }).then((data: Blob) =>{
       saveAs(data, 'cv.doc', { autoBom: true });
    });
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});

    // let cvBody = document.getElementById("cvDocxBody");


    // var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
    // "xmlns:w='urn:schemas-microsoft-com:office:word' "+
    // "xmlns='http://www.w3.org/TR/REC-html40'>"+
    // "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    // var footer = "</body></html>";
    // var sourceHTML = header+document.getElementById("cvDocxBody").innerHTML+footer;

    // let blob = new Blob(['\ufeff', sourceHTML], {
    //   type: 'application/msword'
    // })

    // var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);

    // var fileDownload = document.createElement("a");
    // document.body.appendChild(fileDownload);
    // fileDownload.href = url;
    // fileDownload.download = 'document.doc';
    // fileDownload.click();
    // document.body.removeChild(fileDownload);
    // window.URL.createObjectURL(blob)
    // if(navigator.msSaveBlob)
    // navigator.msSaveBlob(blob, 'doc.doc')
      //  saveAs(blob, 'cv.docx', { autoBom: true });






  }





  
}   
