// tslint:disable-next-line: no-namespace
export namespace TrainingAction {
  const TRAINING_ACTION = '[Shopping]';

  export class LoadAvailable {
    static readonly type = `${TRAINING_ACTION} Load Available`;
  }

  export class LoadFinished {
    static readonly type = `${TRAINING_ACTION}  Load Finished`;
  }

  export class Start {
    static readonly type = `${TRAINING_ACTION} Start Training`;
    constructor(public exerciseId: string) { }
  }

  export class Complete {
    static readonly type = `${TRAINING_ACTION} Training Completed`;
  }

  export class Cancel {
    static readonly type = `${TRAINING_ACTION} Cancel Training`;
  }

  export class PromptCancel {
    static readonly type = `${TRAINING_ACTION} User Prompt To Cancel`;
  }

  export class Resume {
    static readonly type = `${TRAINING_ACTION} Resume Training`;
  }
}
