import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackbar: MatSnackBar) { }

  openErrorPopup(errorMessage: string) {
    const durationInMilliseconds = 3000;
    this.snackbar.open(errorMessage, null, {
      duration: durationInMilliseconds
    });
  }
}
