// tslint:disable-next-line: no-namespace
export namespace AuthAction {

    export class Authenticate {
        static readonly type = '[Auth] Authenticate';
    }

    export class UnAuthenticate {
        static readonly type = '[Auth] UnAuthenticate';
    }
}
