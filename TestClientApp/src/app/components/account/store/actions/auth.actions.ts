import { SignInModel } from "src/app/models/account/signin.model";
import { SignUpModel } from "src/app/models/account/signup.model";

export class SignIn{
    static readonly type = '[Auth] SignIn';
    constructor(public payload: SignInModel){}
}

export class SignUp{
    static readonly type = '[Auth] SignUp';
    constructor(public payload: SignUpModel){}
}

export class SignOut{
    static readonly type = '[Auth] SignOut';
}