import { Action, Actions, NgxsOnInit, ofAction, Selector, State, StateContext } from '@ngxs/store';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { AuthAction } from 'src/app/auth/state/auth.actions';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from './../../shared/ui.service';
import { StopTrainingComponent } from './../current-training/stop-training.component';
import { TrainingAction } from './training.actions';

export interface TrainingStateModel {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    currentExercise: Exercise;
    progress: number;
}

@State<TrainingStateModel>({
    name: 'training',
    defaults: {
        availableExercises: [],
        finishedExercises: [],
        currentExercise: null,
        progress: 0
    }
})

export class TrainingState implements NgxsOnInit {
    private timer: any;

    constructor(
        private trainingService: TrainingService,
        private actions$: Actions,
        private uiService: UiService) { }

    @Selector()
    static availableExercises(state: TrainingStateModel): Exercise[] {
        return state.availableExercises;
    }

    @Selector()
    static finishedExercises(state: TrainingStateModel): Exercise[] {
        return state.finishedExercises;
    }

    @Selector()
    static currentExercise(state: TrainingStateModel): Exercise {
        return state.currentExercise;
    }

    @Selector()
    static isTraining(state: TrainingStateModel): boolean {
        return state.currentExercise != null;
    }

    @Selector()
    static getProgress(state: TrainingStateModel): number {
        return state.progress;
    }

    @Action(TrainingAction.LoadAvailable)
    loadAvailableExercises({ patchState }: StateContext<TrainingStateModel>) {
        return this.trainingService.getAvailableExercises()
            .pipe(
                map(exercises => {
                    patchState({
                        availableExercises: [...exercises]
                    });
                }),
                takeUntil(this.actions$.pipe(ofAction(AuthAction.Logout)))
            );
    }

    @Action(TrainingAction.LoadFinished)
    loadFinishedExercises({ patchState }: StateContext<TrainingStateModel>) {
        return this.trainingService.getFinishedExercises()
            .pipe(
                map(exercises => {
                    patchState({
                        finishedExercises: [...exercises]
                    });
                }),
                takeUntil(this.actions$.pipe(ofAction(AuthAction.Logout)))
            );
    }

    @Action(TrainingAction.Start)
    startTraining({ patchState, getState, dispatch }: StateContext<TrainingStateModel>, action: TrainingAction.Start) {
        return this.trainingService.findExerciseById(action.exerciseId)
            .pipe(
                tap(exercise => {
                    if (exercise) {
                        this.executeProgressTimer(exercise, patchState, getState, dispatch);

                        patchState({
                            currentExercise: exercise
                        });
                    } else {
                        console.log('Coud not find exercise...');
                    }
                })
            );
    }

    private executeProgressTimer(
        exercise: Exercise,
        patchState: (val: Partial<TrainingStateModel>) => TrainingStateModel,
        getState: () => TrainingStateModel,
        dispatch: any) {
        const step = exercise.duration / 100 * 1000;
        // Set a timer, which will tick a progress step, according to the exercise duration
        this.timer = setInterval(() => {
            // Increment progress
            let currentProgress = getState().progress;
            const updatedProgress = currentProgress += 1;
            patchState({
                progress: updatedProgress
            });
            // Check if progress has reached 100
            if (getState().progress >= 100) {
                clearInterval(this.timer);
                dispatch(new TrainingAction.Complete());
            }
        }, step);
    }

    @Action(TrainingAction.Complete)
    async completeTraining({ patchState, getState }: StateContext<TrainingStateModel>) {
        return this.trainingService.completeExercise(getState().currentExercise)
            .then(() => {
                patchState({
                    currentExercise: null,
                    progress: 0
                });
            });
    }

    @Action(TrainingAction.PromptCancel)
    userPromptToCancel({ getState, dispatch }: StateContext<TrainingStateModel>) {
        clearInterval(this.timer);
        const currentProgress = getState().progress;
        const dialogRef = this.uiService.openDialogWithData(StopTrainingComponent, {
            data: {
                progress: currentProgress
            }
        });

        dialogRef.afterClosed()
            .pipe(
                first()
            ).subscribe(trainingExited => {
                if (trainingExited) {
                    dispatch(new TrainingAction.Cancel());
                } else {
                    dispatch(new TrainingAction.Resume());
                }
            });
    }

    @Action(TrainingAction.Resume)
    resumeTraining({ getState, patchState, dispatch }: StateContext<TrainingStateModel>) {
        this.executeProgressTimer(getState().currentExercise, patchState, getState, dispatch);
    }

    @Action(TrainingAction.Cancel)
    async cancelTraining({ patchState, getState }: StateContext<TrainingStateModel>) {
        return this.trainingService.cancelExercise(
            getState().currentExercise,
            getState().progress,
        )
            .then(() => {
                patchState({
                    currentExercise: null,
                    progress: 0
                });
            });
    }

    ngxsOnInit({ dispatch }: StateContext<TrainingStateModel>) {
        dispatch([TrainingAction.LoadAvailable, TrainingAction.LoadFinished]);
    }
}
