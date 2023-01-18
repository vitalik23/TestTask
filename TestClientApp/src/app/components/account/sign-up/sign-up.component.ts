import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SignUpModel } from 'src/app/models/account/signup.model';
import { SignUp } from '../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpModel: SignUpModel;

  constructor(
    private store: Store
  ) 
  {
    this.signUpModel = new SignUpModel();
  }

  ngOnInit(): void {
  }

  public signUp(){
    this.store.dispatch(new SignUp(this.signUpModel))
  }

}
