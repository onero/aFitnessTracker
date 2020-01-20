import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './logged-in.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
