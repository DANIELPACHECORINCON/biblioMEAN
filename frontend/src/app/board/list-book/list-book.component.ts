import { Component, ViewChild } from '@angular/core';
import { BookService } from "../../services/book.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  displayedColumns: string[] = ['ID','NAME', 'ESCRITOR', 'EDITORIAL', 'STATUS', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  message: string = '';
  bookData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationinSecons: number = 2000;

  constructor(private _bookService: BookService, private _snackBar: MatSnackBar) {
    this.bookData = {};
    this.dataSource = new MatTableDataSource(this.bookData);
  }

  ngOnInit(): void {
    this._bookService.listBook().subscribe({
      next: (v) => {
        this.bookData = v.books;
        this.dataSource = new MatTableDataSource(this.bookData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
        this.bookData = {};
      },
      complete: () => console.info('complete'),
    })
  }

  updateBook(book: any, status: string){}
  deleteBook(book: any){
    this._bookService.deleteBook(book).subscribe({
      next: (v) => {
        let index = this.bookData.indexOf(book);
        if (index > -1) {
          this.bookData.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.bookData);
          this.message = 'Deleted book';
          this.openSnackBarSuccesfull();
        }
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
      complete: () => console.info('complete'),
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationinSecons,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationinSecons,
      panelClass: ['styleSnackBarError'],
    });
  }

}
