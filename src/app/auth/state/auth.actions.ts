import { AuthData } from './../models/auth-data.model';
// tslint:disable-next-line: no-namespace
export namespace AuthAction {
  const AUTH_ACTION = '[Auth]';

  export class Login {
    static readonly type = `${AUTH_ACTION} Login`;
    constructor(public authdata: AuthData) { }
  }

  export class Logout {
    static readonly type = `${AUTH_ACTION} Logout`;
  }

  export class Register {
    static readonly type = `${AUTH_ACTION} Register`;
    constructor(public authData: AuthData) { }
  }
}
