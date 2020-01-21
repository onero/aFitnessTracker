// tslint:disable-next-line: no-namespace
export namespace TrainingAction {

    export class LoadAvailable {
        static readonly type = '[Training] Load Available';
    }

    export class LoadFinished {
        static readonly type = '[Training] Load Finished';
    }

    export class Start {
        static readonly type = '[Training] Start Training';
        constructor(public exerciseId: string) { }
    }

    export class Complete {
        static readonly type = '[Training] Training Completed';
    }

    export class Cancel {
        static readonly type = '[Training] Cancel Training';
    }

    export class PromptCancel {
        static readonly type = '[Training] User Prompt To Cancel';
    }

    export class Resume {
        static readonly type = '[Training] Resume Training';
    }
}
