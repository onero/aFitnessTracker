import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';



@NgModule({
  declarations: [TrainingComponent, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule
  ],
  providers: [TrainingService]
})
export class TrainingModule { }
