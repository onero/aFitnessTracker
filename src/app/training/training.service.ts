import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly EXERCISE_COLLECTION = 'availableExercises';
  private readonly FINISHED_EXERCISES = 'finishedExercises';

  private runningExercise: Exercise;

  exerciseChanged$ = new Subject<Exercise>();

  constructor(private afs: AngularFirestore) { }

  getExercises(): Observable<Exercise[]> {
    return this.afs.collection<Exercise>(this.EXERCISE_COLLECTION)
      .snapshotChanges()
      .pipe(
        map(documentChangeActions => {
          return documentChangeActions.map(documentChangeAction => {
            return this.convertDocumentToExercise(documentChangeAction.payload.doc);
          });
        })
      );
  }

  startExercise(selectedId: string) {
    this.afs.collection<Exercise>(this.EXERCISE_COLLECTION).doc(selectedId)
      .get()
      .pipe(
        map(document => {
          return this.convertDocumentToExercise(document);
        })
      )
      .pipe(
        map(exercise => {
          this.runningExercise = exercise;
          this.exerciseChanged$.next({ ...this.runningExercise });
        })
      )
      .subscribe();
  }

  private convertDocumentToExercise(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Exercise {
    const exerciseFromDb: Exercise = {
      id: document.id,
      name: document.data().name,
      duration: document.data().duration,
      calories: document.data().calories,
      date: document.data().date,
      state: document.data().state
    };
    return exerciseFromDb;
  }

  completeExercise() {
    this.addExercise({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged$.next(null);
  }

  getCompletedExercises(): Observable<Exercise[]> {
    return this.afs.collection<Exercise>(this.FINISHED_EXERCISES)
      .snapshotChanges()
      .pipe(
        map(documentChangeActions => {
          return documentChangeActions.map(documentChangeAction => {
            return this.convertDocumentToExercise(documentChangeAction.payload.doc);
          });
        })
      );
  }

  cancelExercise(progress: number) {
    this.addExercise({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged$.next(null);
  }

  private addExercise(exercise: Exercise) {
    this.afs.collection(this.FINISHED_EXERCISES).add(exercise);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
