import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '../shared/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  //baseUrl = 'http://localhost:4000/api/'
  baseUrl = 'https://cvbackendapi.herokuapp.com/api/'

  options: {} = {
    headers: {'content-type': 'application/json'},
    observe: 'body',
    // reportProgress: boolean,
    responseType: 'json',
    // withCredentials?: boolean,
  };

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService
    
    ) { }



  get<Response>(url){
    this.showLoadingIcon();
    return this.http.get<Response>(this.baseUrl + url, this.options).pipe(
      tap(_ => {this.hideLoadingIcon()}),
      catchError(this.handleError())
    );
  }

  post<Response>(url, body){
    this.showLoadingIcon();
    return this.http.post<Response>(this.baseUrl + url, body, this.options).pipe(
      tap(_ => {this.hideLoadingIcon()}),
      catchError(this.handleError())
    );;
  }



showLoadingIcon(){
  this.spinner.isSpinnerShow$.next(true);
}
hideLoadingIcon(){
  this.spinner.isSpinnerHide$.next();
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    // console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
