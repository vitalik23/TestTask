import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SignOut } from './components/account/store/actions/auth.actions';
import { AuthState } from './components/account/store/state/auth.state';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestClientApp';

  isAuthorized: boolean;
  @Select(AuthState.isAuthenticated) isAuthorized$: Observable<boolean>;

  constructor(
    private store: Store
  ){

  }

  ngOnInit(): void {
    this.isAuthorized$.pipe().subscribe((data) => {
      this.isAuthorized = data;
      console.log(data);
    });
  }

  public logOut(){
    this.store.dispatch(new SignOut());
  }

}
