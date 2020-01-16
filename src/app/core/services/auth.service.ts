import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from '../../auth/auth-data.model';
import { FitnessUser } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authenticated = new Subject<boolean>();
  private fitnessUser: FitnessUser;

  constructor() { }

  registerUser(authData: AuthData) {
    this.fitnessUser = {
      email: authData.email,
      userId: Math.round(Math.random() * 1337)
    };
    this.$authenticated.next(true);
  }

  login(authData: AuthData) {
    this.fitnessUser = {
      email: authData.email,
      userId: Math.round(Math.random() * 1337)
    };
    this.$authenticated.next(true);
  }

  logout() {
    this.fitnessUser = null;
    this.$authenticated.next(false);
  }

  get user(): FitnessUser {
    return { ...this.fitnessUser };
  }

  isAuthenticated() {
    return this.fitnessUser != null;
  }
}
