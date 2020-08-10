import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: {};
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService{

  // user = new Subject<User>();
  /**
   * it this equal of subject but also gives subscribers
   * immediate access to the previously emitted value even if they
   * haven't subscribed at the point of time that value was emitted
   * I call the user in data-storage-service
   */
  user = new BehaviorSubject<User>(null);


  private API_KEY = 'AIzaSyBYgQK8blt94Zj0J_ZxYCNmjd4FTe9NLbE';

  constructor(

    private http: HttpClient,
    private router: Router
  ) {
  }

  signup(email: string, password: string){


    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.API_KEY;
    return this.http
      .post<AuthResponseData>(
      url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn //+ used for the casting to number
            );
          })
      );
  }

  login(email: string, password: string){
      const url = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.API_KEY;
      return this.http.post<AuthResponseData>(url,{
        email: email,
        password: password,
        returnSecureToken: true
      })
        .pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn //+ used for the casting to number
            );
          })


        );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 );
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error ){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }


}
