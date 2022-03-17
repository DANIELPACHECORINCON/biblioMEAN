import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css'],
})
export class SaveBookComponent implements OnInit {
  saveData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationSeconds: number = 2000;
  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _bookService: BookService
  ) {
    this.saveData = {};
  }

  registerBook() {
    if (
      !this.saveData.id ||
      !this.saveData.name ||
      !this.saveData.writer ||
      !this.saveData.section ||
      !this.saveData.editorial ||
      !this.saveData.copy
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._bookService.registerBook(this.saveData).subscribe({
        next: (v) => {
          this._router.navigate(['/listBook']);
          this.message = 'libro registrado con exito';
          this.openSnackBarSuccesfull();
          this.saveData = {};
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationSeconds,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationSeconds,
      panelClass: ['styleSnackBarError'],
    });
  }

  ngOnInit(): void {}
}
