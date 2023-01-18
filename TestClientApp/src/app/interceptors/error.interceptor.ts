import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn: "root"
})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        private accountService: AccountService
    ) {}

    accessToken = this.accountService.getAccessToken();

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    window.location.href="account/sign-in"
                }

                //TODO: logic is needed

                return throwError(error);
            })
        );
    }
}
