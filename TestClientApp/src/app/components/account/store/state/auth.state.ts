import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { CookieService } from "ngx-cookie-service";
import { tap } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { ConstAccount } from "src/app/shared/constants/account.constant";
import { SignIn, SignOut } from "../actions/auth.actions";

export class AuthStateModel {
}

State<AuthStateModel>({
    name: 'auth',
    defaults: {
    }
})

@Injectable()
export class AuthState {
    constructor(
        private accountService: AccountService,
        private cookieService: CookieService,
    ) {

    }

    @Action(SignIn)
    signIn(_: StateContext<AuthStateModel>, { payload }: SignIn) {
        return this.accountService.signin(payload).pipe(
            tap((result) => {   
                console.log(result);
                this.cookieService.set(ConstAccount.ACCESS_TOKEN, result.accessToken, { path: '/' });
            }
            
        ));
    }

    @Action(SignOut)
    signOut(_: StateContext<AuthStateModel>) {
        this.cookieService.delete(ConstAccount.ACCESS_TOKEN, '/');
        location.href = "/";
    }
}