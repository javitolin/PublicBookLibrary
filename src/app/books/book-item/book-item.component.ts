import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books.service';
import { Book } from '../book.model';

// TODO - Add search (name, author and owner), pagination, MongoDB
@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  readerName: string;
  searchText = '';
  
  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
  }

  takeBook(readerName: string) {
    this.booksService.takeBook(this.book.id, readerName);
  }

  returnBook(readerName : string) {
    if (!this.booksService.returnBook(this.book.id, readerName)) {
      alert("You didn't take it!");
    } else {
      alert("Thanks for returning the book!")
    }
  }
}
