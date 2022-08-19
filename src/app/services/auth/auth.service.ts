import { Injectable } from '@angular/core';
import * as data from '../../../assets/userData/user.json'
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as mongodb from '../../../../node_modules/mongodb'
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUrl = 'http://localhost:4000/api/'
  baseUrl = 'https://cvbackendapi.herokuapp.com/api/'
  storeToken = new Subject<any>();
  onStoreToken = this.storeToken.asObservable();
  userData: {};
  options: {} = {
    headers: {'content-type': 'application/json'},
    observe: 'body',
    // reportProgress: boolean,
    responseType: 'json',
    // withCredentials?: boolean,
  };

  isLoggedIn = new Subject<any>();
  onloggedIn = this.isLoggedIn.asObservable();

  isLogOut$ = new Subject<any>();
  onlogout = this.isLogOut$.asObservable();
  userId: any;

  constructor(
    private http: HttpClient,
    private dataService: DataService
    ) {
   }

   getUerInfo<Response>(url){
     return this.http.get<Response>(this.baseUrl + url, this.options);
   }

  createUser(userData){
    return this.http.post<Response>(this.baseUrl + 'signup', userData, this.options).subscribe(loggedInData=>{
    });
  }

  loginWithJwt(loginData: object){
    return this.http.post<Response>(this.baseUrl + 'login', loginData, this.options).subscribe(loggedInData=>{
      if(!loggedInData) return;
      this.isLoggedIn.next(loggedInData['user'].id);
      this.dataService.getPersonalInformation();
      this.dataService.getWorkExperience();
      this.dataService.getSkil();
      this.dataService.getEducation();
      this.dataService.getReference();
    });
  }

  isLogedIn(){
    // return this.getToken();
  }

  setToken(token){
    localStorage.setItem('access_token', token['accessToken']);
    localStorage.setItem('referencehToken', token['referencehToken']);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }
  
// refresh token
  refreshToken(){
    let refreshTokenBody = this.getRefrshToken();
    this.http.post(`${this.baseUrl}refresToken`, refreshTokenBody, this.options).subscribe( loggedInData =>{
      this.isLoggedIn.next(loggedInData['user'].id);
    }, (err)=>{
      this.logout();
    })
  }
  setRefrshToken(refrshToken: string){
    return localStorage.setItem('referencehToken', refrshToken);
  }

  getRefrshToken(){
    return localStorage.getItem('referencehToken');
  }

  logout(){
    this.http.get(`${this.baseUrl}logout`, this.options).subscribe(data=>{
      // location.reload();
      this.isLogOut$.next(null);
    },err=>{
      
    })
  }



}
