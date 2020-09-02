import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

// import {AuthResponseData} from "../auth.service";
import {environment} from "../../../environments/environment";
import * as AuthActions from './auth.action';
import {of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {User} from "../user.model";
import {AuthService} from "../auth.service";

/*
 * we not insert provided for root into @Injectable()
 * but in this case injected into this class and we are injecting actions and the HttpClinet,
 * otherwise we would get errors
 */

export interface AuthResponseData {
  localId: string;
  idToken: string;
  email: string;
  passwordHash: string;
  expiresIn: string;
  refreshToken: string;
  providerUserInfo: {};
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  idToken: string,
  ) => {
  const expirationDate = new Date(
    new Date().getTime() + +expiresIn * 1000
  );
  const user = new User(email, userId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  //we return a new action we dont wrapped into auth we don't use of otherwise
  //we create a double observable.
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: idToken,
    expirationDate: expirationDate
  })
};


const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if(!errorRes.error || !errorRes.error.error ){
    //return throwError(errorMessage);
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  // return throwError(errorMessage);

  /**
   * if we return an empty observable "return of()" we have an error
   *
   */
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = this.actions$.pipe(
    //ofType to filter
    ofType(AuthActions.SIGNUP_START),
    //switchMap return a new observable
    switchMap( (signupAction: AuthActions.SignupStart) => {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey;
      return this.http
        .post<AuthResponseData>(
          url,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          })
    })
  ).pipe(
    tap(resData => {
      this.authService.setLogoutTImer(+resData.expiresIn * 1000);
    }),
    map(resData => {
      handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
    }),
    catchError( errorRes => {
      //...
      return handleError(errorRes);
    })
  );



    /*
   * we register the first effects so our first action handler.
   * We don't call subscribe here because ngrx/effect subscribe for you
   * just call pipe instead.
   * In the pipe we need a special RxJS operator which is not part of
   * RxJS but which is provided by ngrx/effects it is ofType operator that
   * allows you to define a filter for which types of effects you want to continue
   * in this observable pipe you're creating, in this observable stream because we
   * have multiple effects by adding multiple properties
   *
   * This is an onging observable stream, this must never die, at least not as long as
   * our application is running and therefore, if we would catch an error here as
   * a next step after switchMap, which we could do because switchmap returns an http
   * observable and this could certaionly throw an error
   *
   */
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),

    /**
     * Allows us to create a new observable by taking another observable's data.
     */
    switchMap( (authData: AuthActions.LoginStart) => {
      /*
       * we can return a new observable and the new observable
       * I want to return here of course uses the Angular HTTP client
       * to send our login request so just what we previously did in the
       * login function in our service
       */
      const url = ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey;
      return this.http.post<AuthResponseData>(url,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resData => {
          this.authService.setLogoutTImer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken
          );
        }),
        catchError( errorRes => {
         //...

          return handleError(errorRes);

        })

        // catchError(
        //   error => {
        //     // ....
        //     // we can return a non error observable
        //     return of();
        //   }),
        //
        // map(resData => {
        //   const expirationDate = new Date( new Date().getTime() + resData.expiresIn * 1000 );
        //   return of( new AuthActions.Login({}) );
        // })
      );

    }),
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    //we not use in this case tap because will not return anything bat map that
    //still allows us to parse all that data
    map(
      () =>{
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
          return {type: 'DUMMY'};
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          // this.user.next(loadedUser);

          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();


          this.authService.setLogoutTImer(expirationDuration)
          //this.store.dispatch(
          //I not user dispatch but only return
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate)
          });
          //); //this.store.dispatch
          // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          // this.autoLogout(expirationDuration);
        }
        //we return a simple object a type property because that qualfies a valid action
        return {type: 'DUMMY'};
      })
  );

  /**
   * This is an effect which does not dispatch a new action at the end,
   * typycally the effects do that, they return generally an observable
   * which holds a new effect whch should be dispatched,
   * BUT THIS EFFECT DOESN'T WE PASSED A DECORATOR DISPATCH FALSE
   *
   */
  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(
      () => {
        this.router.navigate(['/']);
      })
  );
  //I have dispatch false because I wan't dispatch anything
  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(
      () => {
        this.authService.clearLogoutTime();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth'])
      }
    )
  )

  constructor(
    /*
     * Actions is one big observable that will give you access to all dispatched actions
     * so that you can react to them th $ indicate it's an observable and it's used
     * especially for the actions
     */

    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
