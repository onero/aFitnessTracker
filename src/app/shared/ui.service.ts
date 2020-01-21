import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  openErrorPopup(errorMessage: string) {
    const durationInMilliseconds = 3000;
    this.snackbar.open(errorMessage, null, {
      duration: durationInMilliseconds
    });
  }

  openDialogWithData(dialogComponent: any, data: any) {
    return this.dialog.open(dialogComponent, {
      data
    });
  }
}
