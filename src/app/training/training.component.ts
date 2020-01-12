import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aft-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;

  constructor() { }

  ngOnInit() {
  }

}
