import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'aft-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  $exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.$exercises = this.trainingService.getExercises();
  }

  onStartTraining(exerciseId: string) {
    this.trainingService.startExercise(exerciseId);
  }

}
