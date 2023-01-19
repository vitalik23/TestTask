import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConstAccount } from './shared/constants/account.constant';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptorService } from './interceptors/error.interceptor';
import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { AuthGuardService } from './guard/auth-guard.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthState } from './components/account/store/state/auth.state';

export function tokenGetter() {
  return localStorage.getItem(ConstAccount.ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState]),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.apiUrl]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
