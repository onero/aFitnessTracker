import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from '../state/auth.actions';

@Component({
  selector: 'aft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new AuthAction.Login(
      {
        email: form.value.email,
        password: form.value.password
      }
    ));
  }

}
