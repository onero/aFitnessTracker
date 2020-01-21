import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'aft-stop-training',
    template: `<h1 mat-dialog-title>Are you sure?</h1>
              <mat-dialog-content>
                  <p>You already got {{ progress }} %</p>
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button [mat-dialog-close]="true">Yes</button>
                  <button mat-button [mat-dialog-close]="false">No</button>
              </mat-dialog-actions>`
})
export class StopTrainingComponent {
    progress: number;

    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any, private cd: ChangeDetectorRef) {
        this.progress = passedData.data.progress;
    }
}
