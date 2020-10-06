import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Book } from './books/book.model';
import { Reader } from './readers/reader.model';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books: Book[] = [];
  booksChanged = new Subject<Book[]>();

  constructor(private http: HttpClient) {
    this.getBooksFromHttp()
  }

  getBooksFromHttp(): void {
    this.http.get("http://localhost:8080/api/book").subscribe(
      data => {
        this.books = []
        data['data'].forEach(book => {
          var currentBook = new Book(book)
          this.books.push(currentBook)
        })
        this.booksChanged.next(this.books.slice())
      }
    );
  }
  getBooks(): Book[] {
    return this.books.slice()
  }

  takeBook(bookId: number, readerName: string): boolean {
    console.log("Take: " + bookId + " by " + readerName)
      this.http.post("http://localhost:8080/api/book/" + bookId + "/take", { "reader": readerName }).subscribe
        (res => {
          console.log(res)
          this.getBooksFromHttp()
        });
    
    return true;
  }

  returnBook(bookId: number, readerName: string): boolean {
    console.log("Return: " + bookId + " by " + readerName)
      this.http.post("http://localhost:8080/api/book/" + bookId + "/return", { "reader": readerName }).subscribe
        (res => {
          console.log(res)
          this.getBooksFromHttp()
        });
    
    return true;
  }

  addBook(book: Book): void {
    this.http.post("http://localhost:8080/api/book", book).subscribe(
      data => {
        console.log(data)
        this.getBooksFromHttp()
      }
    )
  }
}
