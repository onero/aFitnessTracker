import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthAction } from './auth.actions';

export interface AuthStateModel {
    isAuthenticated: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isAuthenticated: false
    }
})

export class AuthState {

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return state.isAuthenticated;
    }

    @Action(AuthAction.Authenticate)
    authenticate(context: StateContext<AuthStateModel>) {
        context.setState({
            isAuthenticated: true
        });
    }

    @Action(AuthAction.UnAuthenticate)
    unAuthenticate(context: StateContext<AuthStateModel>) {
        context.setState({
            isAuthenticated: false
        });
    }
}
