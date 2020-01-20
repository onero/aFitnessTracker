import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AppRoutes } from 'src/app/core/routes.enum';
import { UiService } from './../../shared/ui.service';
import { TrainingService } from './../../training/training.service';
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
        private trainingService: TrainingService,
        private uiService: UiService) { }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return state.isAuthenticated;
    }

    @Action(AuthAction.Login)
    login(context: StateContext<AuthStateModel>, action: AuthAction.Login) {
        this.trainingService.cancelSubscriptions();
        this.afAuth.auth.signInWithEmailAndPassword(action.authdata.email, action.authdata.password)
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
    logout(context: StateContext<AuthStateModel>) {
        this.afAuth.auth.signOut()
            .then(() => {
                context.setState({
                    isAuthenticated: false
                });
                this.router.navigateByUrl(AppRoutes.LOGIN);
            });
    }

    ngxsOnInit(context: StateContext<AuthStateModel>) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log('Already logged in, redirecting!');

                context.setState({
                    isAuthenticated: true
                });
                this.router.navigateByUrl(AppRoutes.TRAINING);
            } else {
                context.setState({
                    isAuthenticated: false
                });
                this.router.navigateByUrl(AppRoutes.LOGIN);
            }
        });
    }
}
