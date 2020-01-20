import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppRoutes } from './../core/routes.enum';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authenticated = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar) {
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

  private setUserNotAuthenticated() {
    this.trainingService.cancelSubscriptions();
    this.$authenticated.next(false);
    this.router.navigateByUrl(AppRoutes.LOGIN);
    this.isAuthenticated = false;
  }

  private setUserAuthenticated() {
    this.isAuthenticated = true;
    this.$authenticated.next(true);
    this.router.navigateByUrl(AppRoutes.TRAINING);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
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
