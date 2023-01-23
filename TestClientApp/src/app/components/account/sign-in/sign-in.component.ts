import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignInModel } from 'src/app/models/account/signin.model';
import { SignIn } from '../store/actions/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginModel: SignInModel;

  constructor(
    private store: Store
  ) {
    this.loginModel = new SignInModel();
  }

  ngOnInit(): void {

  }

  signIn(){
    this.store.dispatch(new SignIn(this.loginModel));
  }

}
