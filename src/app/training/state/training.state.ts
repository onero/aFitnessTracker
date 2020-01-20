import { Action, Actions, NgxsOnInit, ofAction, Selector, State, StateContext } from '@ngxs/store';
import { map, takeUntil } from 'rxjs/operators';
import { AuthAction } from 'src/app/auth/state/auth.actions';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { TrainingAction } from './training.actions';

export interface TrainingStateModel {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
}

@State<TrainingStateModel>({
    name: 'training',
    defaults: {
        availableExercises: [],
        finishedExercises: []
    }
})

export class TrainingState implements NgxsOnInit {
    constructor(private trainingService: TrainingService, private actions$: Actions) { }

    @Selector()
    static availableExercises(state: TrainingStateModel): Exercise[] {
        return state.availableExercises;
    }

    @Selector()
    static finishedExercises(state: TrainingStateModel): Exercise[] {
        return state.finishedExercises;
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

    ngxsOnInit({ dispatch }: StateContext<TrainingStateModel>) {
        dispatch([TrainingAction.LoadAvailable, TrainingAction.LoadFinished]);
    }
}
