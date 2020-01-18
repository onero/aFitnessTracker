import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';

@Component({
  selector: 'aft-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  $runningExercise: Subscription;


  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.$exerciseChanged.subscribe(exercise => {
      this.ongoingTraining = exercise !== null;
    });
  }

  ngOnDestroy() {
    this.$runningExercise.unsubscribe();
  }

}
