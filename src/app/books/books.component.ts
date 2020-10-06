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
  currentBooksToShow: Book[];
  searchText: string;
  numberOfItems: number;
  itemsPerPage: number = 5;
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
        this.books = books;
        this.numberOfItems = this.books.length
        this.currentBooksToShow = this.books.slice(0, this.itemsPerPage)
      }
    );

    this.books = this.booksService.getBooks();

    this.searchServiceSubscription = this.searchService.currentSearchQuery.subscribe(
      (searchTerm => this.searchText = searchTerm)
    )

    this.currentBooksToShow = this.books.slice(0, this.itemsPerPage)
    this.numberOfItems = this.books.length
  }

  onPageChange($event) {
    this.currentBooksToShow = this.books.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

}
