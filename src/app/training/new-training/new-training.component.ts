import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'aft-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  startTraining = new EventEmitter<void>();

  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.exercises;
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}
