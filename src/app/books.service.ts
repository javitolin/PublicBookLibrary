import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './books/book.model';
import { Reader } from './readers/reader.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books : Book[] = [
    new Book("Book 1", "Author 1", "Owner 1"),
    new Book("Book 2", "Author 2", "Owner 2"),
    new Book("Book 3", "Author 3", "Owner 3"),
    new Book("Book 4", "Author 4", "Owner 4"),
    new Book("Book 5", "Author 5", "Owner 5"),
  ]

  booksChanged = new Subject<Book[]>();

  constructor() { 
    this.books[2].is_available = false;
    this.books[2].readers = [ new Reader("Javi", new Date()) ];
  }

  getBooks() : Book[] {
    return this.books.slice()
  }

  takeBook(bookId: number, readerName: string) : boolean {
    console.log("Take: " + bookId + " by " + readerName)
    var response = this.books.find((b) => b.id == bookId)?.takeBook(readerName);
    this.booksChanged.next(this.books.slice())
    return response;
  }

  returnBook(bookId: number, readerName: string) : boolean {
    var response = this.books.find((b) => b.id == bookId)?.returnBook(readerName);
    this.booksChanged.next(this.books.slice())
    return response;
  }

  addBook(book: Book) : void {
    this.books.push(book);
    this.booksChanged.next(this.books.slice())
  }
}
