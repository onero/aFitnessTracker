import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppRoutes } from '../../core/routes.enum';
import { TrainingService } from '../../training/training.service';
import { AuthData } from '../models/auth-data.model';
import { AuthAction } from './../state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private store: Store) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.setUserAuthenticated();
      } else {
        this.setUserNotAuthenticated();
      }
    });
  }

  private setUserAuthenticated() {
    this.store.dispatch(new AuthAction.Authenticate());
    this.router.navigateByUrl(AppRoutes.TRAINING);
  }

  private setUserNotAuthenticated() {
    this.trainingService.cancelSubscriptions();
    this.store.dispatch(new AuthAction.UnAuthenticate());
    this.router.navigateByUrl(AppRoutes.LOGIN);
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(error => {
        this.snackbar.open(error.message, null, {
          duration: 3000
        });
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(error => {
        this.snackbar.open(error.message, null, {
          duration: 3000
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
