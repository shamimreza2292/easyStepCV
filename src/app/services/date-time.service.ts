import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  dateFormat(date){
    // iso date 2013-03-10T02:00:00Z
    let isodate = date.substr(0,10).split('-');
    let year = isodate[0];
    let month = isodate[1];
    let day = isodate[2];
    let convertedDate = day + "/" + month + "/" + year;
    return convertedDate
  }

  formDateFormatYYMMDD(date){
    // iso date 2013-03-10T02:00:00Z
    let isodate = date.substr(0,10).split('-');
    let year = isodate[0];
    let month = isodate[1];
    let day = isodate[2];
    let convertedDate = year  + "-" + month  + "-" + day ;
    return convertedDate
  }



  // 

  // x.substr(0,10).split('-')




}
