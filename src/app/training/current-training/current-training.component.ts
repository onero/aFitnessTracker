import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TrainingAction } from '../state/training.actions';
import { TrainingState } from './../state/training.state';

@Component({
  selector: 'aft-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent {
  @Select(TrainingState.getProgress) progress$: Observable<number>;

  constructor(private store: Store) { }

  onStop() {
    this.store.dispatch(new TrainingAction.PromptCancel());
  }

}
