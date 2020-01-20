import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingState } from './../state/training.state';
import { TrainingService } from './../training.service';

@Component({
  selector: 'aft-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  @Select(TrainingState.availableExercises) exercises$: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService) { }


  onStartTraining(exerciseId: string) {
    this.trainingService.startExercise(exerciseId);
  }

}
