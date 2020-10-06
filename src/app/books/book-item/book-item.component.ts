import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BooksService } from 'src/app/books.service';
import { UserMessageService } from 'src/app/user-message.service';
import { Book } from '../book.model';

// TODO - MongoDB
@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  readerName: string;
  searchText = '';

  constructor(private booksService: BooksService, private userMessageService: UserMessageService) { }

  ngOnInit(): void {
  }

  takeBook(readerName: string) {
    this.booksService.takeBook(this.book.id, readerName).toPromise().then(res => {
      console.log(res);
      this.booksService.retrieveBooks();
      this.userMessageService.setMessage(res['message'], res['success'])
    });
  }

  returnBook(readerName: string) {
    this.booksService.returnBook(this.book.id, readerName).toPromise().then(
      res => {
        console.log(res);
        this.booksService.retrieveBooks();
        this.userMessageService.setMessage(res['message'], res['success'])
      }
    );
  }
}
