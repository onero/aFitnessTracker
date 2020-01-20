import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingState } from './state/training.state';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingService } from './training.service';
import { TrainingComponent } from './training/training.component';



@NgModule({
  declarations: [TrainingComponent, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent],
  imports: [
    TrainingRoutingModule,
    SharedModule,
    NgxsModule.forFeature([TrainingState])
  ],
  providers: [TrainingService]
})
export class TrainingModule { }
