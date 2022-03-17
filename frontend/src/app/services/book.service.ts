import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private env: string;

  constructor(private _http: HttpClient) { 
    this.env = environment.APP_URL;
  }

  registerBook(book: any){
    return this._http.post<any>(this.env+'/book/registerBook', book);
  }

  listBook(){
    return this._http.get<any>(this.env+'/book/listBook');
  }

  deleteBook(book: any){
    return this._http.delete<any>(this.env+'/book/deleteBook/'+book._id);
  }
}
