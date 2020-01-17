import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../../auth/auth-data.model';
import { FitnessUser } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authenticated = new Subject<boolean>();
  private fitnessUser: FitnessUser;

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.fitnessUser = {
      email: authData.email,
      userId: Math.round(Math.random() * 1337)
    };
    this.onAuthenticated();
  }

  login(authData: AuthData) {
    this.fitnessUser = {
      email: authData.email,
      userId: Math.round(Math.random() * 1337)
    };
    this.onAuthenticated();
  }

  logout() {
    this.fitnessUser = null;
    this.$authenticated.next(false);
    this.router.navigateByUrl('7login')
  }

  get user(): FitnessUser {
    return { ...this.fitnessUser };
  }

  isAuthenticated() {
    return this.fitnessUser != null;
  }

  private onAuthenticated() {
    this.$authenticated.next(true);
    this.router.navigateByUrl('/training');
  }
}
