import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
    private trainingService: TrainingService) {
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
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  private setUserAuthenticated() {
    this.isAuthenticated = true;
    this.$authenticated.next(true);
    this.router.navigate(['/training']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
