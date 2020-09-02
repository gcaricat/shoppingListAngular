import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

import { environment} from "../../environments/environment";
import {User} from "./user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

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
  // user = new BehaviorSubject<User>(null); for the ngx store
  private tokenExpirationTimer: any;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  // autoLogout(expirationDuration: number){
  setLogoutTImer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout( () => {
        // this.logout();
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration );
  }

  clearLogoutTime(){
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // login(email: string, password: string){
  //   const url = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey;
  //   return this.http.post<AuthResponseData>(url,{
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(resData => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn //+ used for the casting to number
  //         );
  //       })
  //
  //
  //     );
  // }

  // signup(email: string, password: string){
  //
  //
  //   const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey;
  //   return this.http
  //     .post<AuthResponseData>(
  //     url,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(resData => {
  //           this.handleAuthentication(
  //             resData.email,
  //             resData.localId,
  //             resData.idToken,
  //             +resData.expiresIn //+ used for the casting to number
  //           );
  //         })
  //     );
  // }



  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if(!userData){
  //     return;
  //   }
  //
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );
  //
  //   if(loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate)
  //       })
  //     );
  //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  //
  // }

  // logout(){
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //
  //   if( this.tokenExpirationTimer ) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }



  // private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number){
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 );
  //   const user = new User(
  //     email,
  //     localId,
  //     idToken,
  //     expirationDate
  //   );
  //   // this.user.next(user);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: email,
  //       userId: localId,
  //       token: idToken,
  //       expirationDate: expirationDate
  //     })
  //   );
  //   this.autoLogout(expiresIn * 1000); //from ms in sec
  //   localStorage.setItem('userData', JSON.stringify(user))
  // }
  //
  // private handleError(errorRes: HttpErrorResponse){
  //   let errorMessage = 'An unknown error occurred!';
  //   if(!errorRes.error || !errorRes.error.error ){
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message){
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email does not exist.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is not correct.';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }


}
