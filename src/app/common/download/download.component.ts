import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { asBlob } from 'html-docx-js-typescript'
import { DownloadService } from 'src/app/services/download.service';


@Component({
  selector: 'cv-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  @ViewChild('DownloadModal') DownloadModal: ModalComponent;

  constructor(
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
  }

  
openDownloadModal(){
  this.DownloadModal.open();
 }


 closeDownloadModal(){
  this.DownloadModal.close();
 }
 
docFileDownload(){
  // let cvBody = document.getElementById("cvDocxBody").outerHTML;
  // const data =  asBlob(cvBody, { orientation: 'landscapeng', margins: { top: 100 } }).then((data: Blob) =>{
  //    saveAs(data, 'cv.doc', { autoBom: true });
  // });

  this.downloadService.docFileDownload();
  this.closeDownloadModal();
}

}
