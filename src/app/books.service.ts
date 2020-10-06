import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './books/book.model';
import { Reader } from './readers/reader.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books: Book[] = [];
  booksChanged = new Subject<Book[]>();

  constructor() {

    for (var i = 0; i < 10; i++) {
      this.books.push(new Book("Title: " + i, "Author " + i, "Owner: " + i))
    }

    this.books[2].is_available = false;
    this.books[2].readers = [new Reader("Javi", new Date())];
  }

  getBooks(): Book[] {
    return this.books.slice()
  }

  takeBook(bookId: number, readerName: string): boolean {
    console.log("Take: " + bookId + " by " + readerName)
    var response = this.books.find((b) => b.id == bookId)?.takeBook(readerName);
    this.booksChanged.next(this.books.slice())
    return response;
  }

  returnBook(bookId: number, readerName: string): boolean {
    var response = this.books.find((b) => b.id == bookId)?.returnBook(readerName);
    this.booksChanged.next(this.books.slice())
    return response;
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.booksChanged.next(this.books.slice())
  }
}
