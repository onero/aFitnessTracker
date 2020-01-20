import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingService } from './training.service';
import { TrainingComponent } from './training/training.component';



@NgModule({
  declarations: [TrainingComponent, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent],
  imports: [
    TrainingRoutingModule,
    SharedModule,
  ],
  providers: [TrainingService]
})
export class TrainingModule { }
