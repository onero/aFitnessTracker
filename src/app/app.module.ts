import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { StopTrainingComponent } from './training/current-training/stop-training.component';


@NgModule({
  declarations: [
    AppComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
