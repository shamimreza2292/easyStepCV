import { Injectable } from '@angular/core';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})

export class DownloadService {


  downloadTemplateId: string ;





    docFileDownload(){
        let cvBody = document.getElementById(this.downloadTemplateId).outerHTML;

        const data =  asBlob(cvBody, { orientation: 'portrait', margins: { top: 100, } }).then((data: Blob) =>{
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