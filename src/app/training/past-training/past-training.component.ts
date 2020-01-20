import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'aft-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  $completedExercises: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngAfterViewInit() {
    this.$completedExercises = this.trainingService.getCompletedExercises()
      .subscribe(exercises => {
        this.dataSource.data = exercises;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    if (this.$completedExercises) {
      this.$completedExercises.unsubscribe();
    }
  }

  onFiltering(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
