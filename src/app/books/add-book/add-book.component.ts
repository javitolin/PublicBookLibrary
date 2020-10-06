import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    var book = new Book(this.bookForm.value)
    this.booksService.addBook(book);
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let bookTitle = '';
    let bookAuthor = '';
    let owner = '';

    this.bookForm = new FormGroup({
      title: new FormControl(bookTitle, Validators.required),
      author: new FormControl(bookAuthor, Validators.required),
      owner: new FormControl(owner, Validators.required),
    });
  }
}
