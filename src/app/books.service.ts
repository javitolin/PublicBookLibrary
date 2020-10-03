import { Injectable } from '@angular/core';
import { Book } from './books/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books : Book[] = [
    new Book(1, "Book 1", "Autho 1", "Owner 1", true),
    new Book(2, "Book 2", "Autho 2", "Owner 2", true),
    new Book(3, "Book 3", "Autho 3", "Owner 3", false),
    new Book(4, "Book 4", "Autho 4", "Owner 4", true),
  ]
  constructor() { }

  getBooks() : Book[] {
    return this.books.slice()
  }

  takeBook(bookId: number, readerName: string) : boolean{
    return this.books.find((b) => b.id == bookId)?.takeBook(readerName);
  }
  
}
