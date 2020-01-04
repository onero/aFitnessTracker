import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './../material.module';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent }
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
