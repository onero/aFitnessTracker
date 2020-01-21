import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TrainingAction } from '../state/training.actions';
import { Exercise } from './../exercise.model';
import { TrainingState } from './../state/training.state';

@Component({
  selector: 'aft-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnDestroy {
  @Select(TrainingState.availableExercises) exercises$: Observable<Exercise[]>;

  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  onStartTraining(exerciseId: string) {
    this.store.dispatch(new TrainingAction.Start(exerciseId));
  }

  ngOnDestroy() {
    this.cd.detach();
  }
}
