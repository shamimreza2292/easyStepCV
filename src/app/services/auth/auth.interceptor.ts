import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthService } from "./auth.service";




@Injectable()
export class authInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
        private authService: AuthService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
       console.log('interceptor calling...');
    //    this.authService.refreshToken();
       
        return next.handle(request).pipe(catchError((err): Observable<HttpEvent<any>>  =>{
            console.log(err);

            if([401, 403].includes(err.status)){
                
                this.authService.refreshToken();

                return throwError(err.message)
            }
        })) 
    }

}



// export class authInterceptor implements HttpInterceptor {

//     constructor(private injector: Injector,
//         private authService: AuthService
//         ) {}

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
//        console.log('interceptor calling...');
//     //    this.authService.refreshToken();
       
//         return next.handle(request).pipe(catchError((err): Observable<HttpEvent<any>>  =>{
//             console.log(err);

//             if([401, 403].includes(err.status)){
                
//                 this.authService.refreshToken();

//                 return throwError(err.message)
//             }
//         })) 
//     }

// }