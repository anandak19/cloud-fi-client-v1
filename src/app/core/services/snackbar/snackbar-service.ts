import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _snackbar = inject(MatSnackBar);

  success(message = 'Success', verticalPosition: 'top' | 'bottom' = 'bottom', horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center') {
    return this._snackbar.open(message, 'Ok', {
      duration: 3000,
      verticalPosition,
      horizontalPosition,
      panelClass: ['mat-snackbar-panel-custom', 'mode-success'],
    });
  }

  error(message = 'An Error Occurred', verticalPosition: 'top' | 'bottom' = 'bottom', horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center') {
    return this._snackbar.open(message, 'Dismiss', {
      duration: 9000,
      verticalPosition,
      horizontalPosition,
      panelClass: ['mat-snackbar-panel-custom', 'mode-error'],
    });
  }

  info(message: string, verticalPosition: 'top' | 'bottom' = 'bottom', horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center') {
    return this._snackbar.open(message, 'Ok', {
      duration: 7000,
      verticalPosition,
      horizontalPosition,
      panelClass: ['mat-snackbar-panel-custom', 'mode-info'],
    });
  }
}
