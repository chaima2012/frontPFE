import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, from, map, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  token:any

  constructor(private http: HttpClient,private router:Router) {

   }
    utf8_to_b64(str:any) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  
   b64_to_utf8(str:any) {
    return decodeURIComponent(escape(window.atob(str)));
  }
   



  login(a:any,b:any){



    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json'
       
      })
    };
  
  
    let body = {
      "login": a,
      "password": b,
  
    }
  
  
    return this.http.post("http://localhost:5058/api/connexion/api/connexion", JSON.stringify(body), httpOptions).pipe(
     
      catchError(this.handleError));
  
  
  
  }

//token api to consume other APIs 
  Authentifiaction(a: string,b: string) {

    const body = new URLSearchParams();
    body.set('username', a);
    body.set('password', b);
    body.set('grant_type', 'password');
    body.set('scope', 'openid 8d083a5a-32f1-42b1-9f5f-0444da5b2889 offline_access');
    body.set('client_id', '8d083a5a-32f1-42b1-9f5f-0444da5b2889');
    body.set('response_type', 'token id_token');
    return this.http.post<any>("url_token",body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      observe: 'response',
      reportProgress: true
    }).pipe(
      // retry(1),

      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:', error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // console.error(         `Backend returned code ${error.status}, ` +     `body was: ${error.error}`);
    }

    // localStorage.setItem('error', error.message);
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
}
