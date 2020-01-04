import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'aft-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  latestSignupDateAllowed: Date;

  constructor() { }

  ngOnInit() {
    this.latestSignupDateAllowed = new Date();
    this.latestSignupDateAllowed.setFullYear(this.latestSignupDateAllowed.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
