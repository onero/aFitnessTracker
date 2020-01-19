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
  user: any = null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        this.setUserNotAuthenticated();
      }
    });
  }

  private setUserNotAuthenticated() {
    localStorage.setItem('user', null);
    JSON.parse(localStorage.getItem('user'));
  }

  get isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) { this.$authenticated.next(true); }
    return user !== null;
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.onAuthenticated();
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.onAuthenticated();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.$authenticated.next(false);
    this.trainingService.cancelSubscriptions();
    this.setUserNotAuthenticated();
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
    console.log('Goodbye!');

  }

  private onAuthenticated() {
    this.$authenticated.next(true);
    this.router.navigateByUrl('/training');
  }
}
