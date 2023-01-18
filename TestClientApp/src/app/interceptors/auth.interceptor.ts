import { Injectable } from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountService } from "../services/account.service";
import { Store } from "@ngxs/store";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(
        private accountService: AccountService,
        private store: Store,
    ) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const accessToken = this.accountService.getAccessToken();

        if(accessToken){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        
        return next.handle(req);
    }

}