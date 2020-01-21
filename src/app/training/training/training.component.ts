import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TrainingState } from './../state/training.state';

@Component({
  selector: 'aft-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  @Select(TrainingState.isTraining) isTraining$: Observable<boolean>;

  constructor() { }
}
