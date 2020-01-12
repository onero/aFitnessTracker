import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aft-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  startTraining = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}
