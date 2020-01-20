import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngxs/store';
import { Exercise } from '../exercise.model';
import { TrainingState } from '../state/training.state';

@Component({
  selector: 'aft-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.store.select(TrainingState.finishedExercises)
      .subscribe(exercises => {
        this.dataSource.data = exercises;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // Enforcing change detection for possible reload/relogin
        this.cd.detectChanges();
      });
  }

  onFiltering(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
