import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "../services/account.service";
import { AlertifyService } from "../services/alertify.service";

@Injectable({
    providedIn: "root"
})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        private accountService: AccountService,
        private alertService: AlertifyService
    ) {}

    accessToken = this.accountService.getAccessToken();

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    window.location.href="account/sign-in"
                }

                if(error.status == 404){
                    console.log("404");
                    var message = this.handleException(error);
                    this.alertService.error(message);
                }

                if(error.status == 400){
                    var message = this.handleException(error);
                    this.alertService.error(message);
                }

                return throwError(error);
            })
        );
    }

    private handleException(error: any){
        if(!error.error){
            return "Something went wrong!"
        }

        var errorMessage = "";

        error.error.forEach((item: string) => {
            errorMessage += `\n${item}`
        });

        return errorMessage;
    }
}
