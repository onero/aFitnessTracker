import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AppRoutes } from 'src/app/core/routes.enum';
import { UiService } from './../../shared/ui.service';
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

export class AuthState implements NgxsOnInit {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private uiService: UiService) { }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return state.isAuthenticated;
    }

    @Action(AuthAction.Register)
    register(context: StateContext<AuthStateModel>, action: AuthAction.Register) {
        this.afAuth.auth.createUserWithEmailAndPassword(action.authData.email, action.authData.password)
            .then(() => {
                context.setState({
                    isAuthenticated: true
                });
                this.router.navigateByUrl(AppRoutes.TRAINING);
            })
            .catch(error => {
                this.uiService.openErrorPopup(error.message);
            });
    }

    @Action(AuthAction.Login)
    async login(context: StateContext<AuthStateModel>, action: AuthAction.Login) {
        return this.afAuth.auth.signInWithEmailAndPassword(action.authdata.email, action.authdata.password)
            .then(() => {
                context.setState({
                    isAuthenticated: true
                });
                this.router.navigateByUrl(AppRoutes.TRAINING);
            })
            .catch(error => {
                this.uiService.openErrorPopup(error.message);
            });
    }

    @Action(AuthAction.Logout)
    async logout(context: StateContext<AuthStateModel>) {
        this.router.navigateByUrl(AppRoutes.LOGIN);
        return this.afAuth.auth.signOut()
            .then(() => {
                context.setState({
                    isAuthenticated: false
                });
            });
    }

    ngxsOnInit(context: StateContext<AuthStateModel>) {
        return this.afAuth.authState.subscribe(user => {
            if (user) {
                this.router.navigateByUrl(AppRoutes.TRAINING);
                return context.setState({
                    isAuthenticated: true
                });
            } else {
                this.router.navigateByUrl(AppRoutes.LOGIN);
                return context.setState({
                    isAuthenticated: false
                });
            }
        });
    }
}
