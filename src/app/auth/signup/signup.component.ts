import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from 'src/app/auth/state/auth.actions';

@Component({
  selector: 'aft-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  latestSignupDateAllowed: Date;

  constructor(private store: Store) { }

  ngOnInit() {
    this.latestSignupDateAllowed = new Date();
    this.latestSignupDateAllowed.setFullYear(this.latestSignupDateAllowed.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new AuthAction.Register(
      {
        email: form.value.email,
        password: form.value.password
      }
    ));
  }

}
