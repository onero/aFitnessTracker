import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';



@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [HeaderComponent, SidenavComponent]
})
export class CoreModule { }
