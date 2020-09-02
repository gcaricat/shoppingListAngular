import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

/**
 * for the authentication we are use NgRx.
 * We are using:
 * - the reducer for our general statem like the authenticated user,
 *   if we have an error and if we're loading
 * - the auth componend dispatches our different login or sign-up actions and
 *   takes advantage of the errr and the loading state.
 * - The auth service is used for managing our token timer then, we could
 *   move that into ngrx/effects somehow but we would need a lot of
 *   observable magic for this
 *
 *   the auth intercepotr and auth guard take advantage for ngrx/store and therefore now
 *
 */

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        {path: '', component: AuthComponent}
    ]),
    SharedModule
  ]
})
export class AuthModule{
}
