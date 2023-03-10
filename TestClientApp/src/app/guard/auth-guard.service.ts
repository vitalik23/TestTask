import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SignOut } from '../components/account/store/actions/auth.actions';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private accountService: AccountService,
        private store: Store
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const token = this.accountService.getAccessToken();
        
        if ((!token || token == "") || this.accountService.isExpiredToken(token)) {
            location.href = "account/sign-in";
            return false;
        }

        return true;
    }
}