import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly AVAILABLE_EXERCISE_COLLECTION = 'availableExercises';
  private readonly FINISHED_EXERCISES = 'finishedExercises';

  constructor(private afs: AngularFirestore) { }

  getAvailableExercises(): Observable<Exercise[]> {
    return this.afs.collection<Exercise>(this.AVAILABLE_EXERCISE_COLLECTION)
      .snapshotChanges()
      .pipe(
        map(documentChangeActions => {
          return documentChangeActions.map(documentChangeAction => {
            return this.convertDocumentToExercise(documentChangeAction.payload.doc);
          });
        })
      );
  }

  findExerciseById(selectedId: string) {
    return this.afs.collection<Exercise>(this.AVAILABLE_EXERCISE_COLLECTION)
      .doc(selectedId)
      .get()
      .pipe(first())
      .pipe(
        map(document => {
          return this.convertDocumentToExercise(document);
        })
      );
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

  completeExercise(currentExercise: Exercise) {
    return this.addExercise({
      ...currentExercise,
      date: new Date(),
      state: 'completed'
    });
  }

  getFinishedExercises(): Observable<Exercise[]> {
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

  cancelExercise(exercise: Exercise, progress: number) {
    return this.addExercise({
      ...exercise,
      duration: exercise.duration * (progress / 100),
      calories: exercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
  }

  private addExercise(exercise: Exercise) {
    return this.afs.collection(this.FINISHED_EXERCISES).add(exercise);
  }

}
