import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contactMe$ = new Subject();
  oncontactMe = this.contactMe$.asObservable();
  skil$ = new Subject();
  onSkil = this.skil$.asObservable();

  getSkil$ = new Subject();
  onGetSkil = this.getSkil$.asObservable();
  postWorkExperience$ = new Subject();
  onPostWorkExperience = this.postWorkExperience$.asObservable();
  getWorkExperience$ = new Subject();
  ongetWorkExperience = this.getWorkExperience$.asObservable();
  postEducation$ = new Subject();
  onEducationPost = this.postEducation$.asObservable();
  getEducation$ = new Subject();
  onGetEducation = this.getEducation$.asObservable();

  getReference$ = new Subject();
  onGetReference = this.getReference$.asObservable();

  editCv$ = new Subject();
  onEditCv = this.editCv$.asObservable();
  downloadBtn$ = new Subject();
  onDownloadBtnSub = this.downloadBtn$.asObservable();

  isCvOnEditMode: boolean = false;

  constructor(private http: HttpServiceService) { }


  prepearCvData(){
    
  }

  onClickEidtCv(){
    this.isCvOnEditMode = !this.isCvOnEditMode;
    this.editCv$.next(this.isCvOnEditMode);
  }

onClickDownloadBtn(){
  this.downloadBtn$.next();
}


  getPersonalInformation(){
    this.http.get('personalInfo').subscribe((data)=>{
      if(!data) return;
      this.contactMe$.next(data);
    },err=>{
      console.log(err);
      
    });
  }

postPersonalInformation(contactMeInfo){
  this.http.post('personalInfo', contactMeInfo).subscribe(data=>{
    if(!data) return;
    this.contactMe$.next(data);
  }) 
}


postSkil(skilObj){
  this.http.post('skil', skilObj).subscribe(data=>{
    if(!data) return;
    this.skil$.next(data);
    this.getSkil();
  })
}

getSkil(){
  this.http.get('skil').subscribe(data=>{
    if(!data) return;
    this.getSkil$.next(data);
  })
}

postWorkExperience(skilObj){
  this.http.post('workingexperience', skilObj).subscribe(data=>{
    if(!data) return;
    this.postWorkExperience$.next(data);
    this.getWorkExperience();
  })
}

getWorkExperience(){
  this.http.get('workingexperience').subscribe(data=>{
    this.getWorkExperience$.next(data);    
  });
}


postEducation(eduObj){
  this.http.post('educations', eduObj).subscribe(data=>{
    if(!data) return;
    this.postEducation$.next(data);
    this.getEducation();
  })
}

getEducation(){
  this.http.get('educations').subscribe(data=>{
    this.getEducation$.next(data);    
  });
}

// reference

postReference(refObj){
  this.http.post('references', refObj).subscribe(data=>{
    if(!data) return;
    // this.postReference$.next(data);
    this.getReference();
  })
}
getReference(){
  this.http.get('references').subscribe(data=>{
    this.getReference$.next(data);    
  });
}

}
