import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from '../books.service';
import { SearchService } from '../search.service';
import { Book } from './book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[];
  searchText: string;
  booksServiceSubscription: Subscription;
  searchServiceSubscription: Subscription;

  constructor(private booksService: BooksService, private searchService: SearchService) { }

  ngOnDestroy(): void {
    this.booksServiceSubscription?.unsubscribe();
    this.searchServiceSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.booksServiceSubscription = this.booksService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books
      }
    );

    this.books = this.booksService.getBooks();

    this.searchServiceSubscription = this.searchService.currentSearchQuery.subscribe(
      (searchTerm => this.searchText = searchTerm)
    )
  }

}
