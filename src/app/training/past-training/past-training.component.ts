import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Exercise } from '../exercise.model';
import { TrainingState } from '../state/training.state';

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

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.store.select(TrainingState.finishedExercises)
      // Since this view will be updated, when a new value emits from firestore, we need to handle the subscription for ngxs!
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(exercises => {
        this.dataSource.data = exercises;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // Enforcing change detection for possible reload/relogin
        // Read more here: https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFiltering(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
