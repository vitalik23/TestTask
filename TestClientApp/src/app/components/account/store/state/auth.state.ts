import { Injectable, Injector, NgZone } from "@angular/core";
import { Route, Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CookieService } from "ngx-cookie-service";
import { tap } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { ConstAccount } from "src/app/shared/constants/account.constant";
import { SignIn, SignOut, SignUp } from "../actions/auth.actions";

export class AuthStateModel {
    isAuthenticated: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isAuthenticated: false
    }
})

@Injectable()
export class AuthState {
    constructor(
        private accountService: AccountService,
        private cookieService: CookieService,
        private router: Router,
        private injector: Injector
    ) {

    }

    ngxsOnInit({ setState }: StateContext<AuthStateModel>) {
        const token = this.accountService.getAccessToken();

        setState({
            isAuthenticated: (token && !this.accountService.isExpiredToken(token)) as boolean
        });
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel) {
        return state.isAuthenticated;
    }

    @Action(SignIn)
    signIn({ getState, setState }: StateContext<AuthStateModel>, { payload }: SignIn) {
        return this.accountService.signin(payload).pipe(
            tap((result) => {
                console.log(result);

                var state = getState();

                if (!result) {
                    return;
                }

                setState({
                    ...state,
                    isAuthenticated: true
                });

                this.cookieService.set(ConstAccount.ACCESS_TOKEN, result.accessToken, { path: '/' });

                const ngZone = this.injector.get(NgZone);
                ngZone.run(() => {
                    this.router.navigateByUrl("/");
                });

            }

            ));
    }

    @Action(SignUp)
    signUp(_: StateContext<AuthStateModel>, { payload }: SignUp) {
        return this.accountService.signup(payload).pipe(
            tap((result) => {
                console.log(result);
            }
            ));
    }

    @Action(SignOut)
    signOut({ getState, setState }: StateContext<AuthStateModel>) {

        var state = getState();

        setState({
            ...state,
            isAuthenticated: false
        });

        this.cookieService.delete(ConstAccount.ACCESS_TOKEN, '/');
        location.href = "/";
    }
}