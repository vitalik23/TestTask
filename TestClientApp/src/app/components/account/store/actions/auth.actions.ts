import { SignInModel } from "src/app/models/account/signin.model";

export class SignIn{
    static readonly type = '[Auth] SignIn';
    constructor(public payload: SignInModel){}
}

export class SignOut{
    static readonly type = '[Auth] SignOut';
}