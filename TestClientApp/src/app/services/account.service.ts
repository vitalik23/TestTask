import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SignInModel } from '../models/account/signin.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/account/token.model';
import { SignUpModel } from '../models/account/signup.model';
import { ConstAccount } from '../shared/constants/account.constant';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public signin(model: SignInModel): Observable<TokenModel>{
    return this.http.post<TokenModel>(`${environment.apiUrl}/account/sign-in`, model);
  }

  public signup(model: SignUpModel): Observable<boolean>{
    return this.http.post<boolean>(`${environment.apiUrl}/account/sign-up`, model);
  }

  public getAccessToken(): string{
    return this.cookieService.get(ConstAccount.ACCESS_TOKEN);
  }

  public isExpiredToken(token: string): boolean {
    return new JwtHelperService().isTokenExpired(token);
}
}
