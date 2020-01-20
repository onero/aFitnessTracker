import { AuthData } from './../models/auth-data.model';
// tslint:disable-next-line: no-namespace
export namespace AuthAction {

    export class Login {
        static readonly type = '[Auth] Login';
        constructor(public authdata: AuthData) { }
    }

    export class Logout {
        static readonly type = '[Auth] Logout';
    }
}
