import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarQueue: string[] = [];

  constructor(private snackbar: MatSnackBar) {}

  isInstanceVisible = false;

  add(message: string) {
    this.snackbarQueue.push(message);
    if (!this.isInstanceVisible) {
      this.showNext();
    }
  }

  private showNext() {
    if (this.snackbarQueue.length === 0) {
      return;
    }
    this.isInstanceVisible = true;
    this.snackbar.open(this.snackbarQueue.shift() as string, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.snackbar._openedSnackBarRef!.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.showNext();
    });
  }
}
