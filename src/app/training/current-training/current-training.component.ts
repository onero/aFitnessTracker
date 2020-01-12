import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'aft-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output()
  exitTraining = new EventEmitter<void>();

  progress = 0;
  timer: number;

  constructor(private diallog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeProgress();
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.diallog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(trainingExited => {
      if (trainingExited) {
        this.exitTraining.emit();
      } else {
        this.startOrResumeProgress();
      }
    });
  }

  private startOrResumeProgress() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

}
