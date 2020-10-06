import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Book } from './books/book.model';
import { catchError, map, retry, take } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl: string = "http://localhost:8080/api/books/"
  private books: Book[] = [];
  booksChanged = new Subject<Book[]>();
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.retrieveBooks()
  }

  retrieveBooks(): void {
    this.subscription = this.http.get(this.baseUrl).subscribe(
      data => {
        this.books = []
        console.log(data)
        data['data'].forEach(book => {
          var currentBook = new Book(book)
          this.books.push(currentBook)
        })
        this.booksChanged.next(this.books.slice())
      }
    );
  }

  Close(): void {
    this.subscription?.unsubscribe()
  }

  getBooks(): Book[] {
    return this.books.slice()
  }

  takeBook(bookId: number, readerName: string): Observable<any> {
    console.log("Take: " + bookId + " by " + readerName)
    return this.http.post(this.baseUrl + bookId + "/take", { "reader": readerName });
  }

  returnBook(bookId: number, readerName: string): Observable<any> {
    console.log("Return: " + bookId + " by " + readerName)
    return this.http.post(this.baseUrl + bookId + "/return", { "reader": readerName });
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
