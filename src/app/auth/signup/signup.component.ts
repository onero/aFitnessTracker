import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/providers/auth.service';

@Component({
  selector: 'aft-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  latestSignupDateAllowed: Date;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.latestSignupDateAllowed = new Date();
    this.latestSignupDateAllowed.setFullYear(this.latestSignupDateAllowed.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
