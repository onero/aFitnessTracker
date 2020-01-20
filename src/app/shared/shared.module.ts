import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { UiService } from './ui.service';



@NgModule({
  declarations: [],
  imports: [],
  exports: [MaterialModule, CommonModule],
  providers: [UiService]
})
export class SharedModule { }
