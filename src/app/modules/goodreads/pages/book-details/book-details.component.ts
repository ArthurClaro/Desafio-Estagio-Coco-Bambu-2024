import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DatePipe, ViewportScroller } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { ELocalStorage } from '../../enum/ELocalStorage';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, ChipsModule, RouterLinkActive, DialogConfirmComponent, SkeletonModule, RatingModule, FormsModule, DatePipe],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export default class BookDetailsComponent implements OnInit {
  @ViewChild(DialogConfirmComponent) dialogConfirm!: DialogConfirmComponent;
  
  public bookDetail: any;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #viewportScroller = inject(ViewportScroller);

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.bookDetail = navigation?.extras.state?.['bookDetail'];
  }

  ngOnInit(): void {
    this.#viewportScroller.scrollToPosition([0, 0]);
    const bookId = this.#route.snapshot.params['id'];
    const existingBook = this.findBookInLocalStorage(bookId);
    if (existingBook) {
      this.bookDetail = existingBook;
    } else {
      if (!this.bookDetail || !this.bookDetail.volumeInfo) {
        this.router.navigate(['/']);
      }
    }
  }

  openDialog(): void {
    this.dialogConfirm.showDialog();
  }

  handleConfirm(data: any): void {
    const combinedData = {
      ...this.bookDetail,
      ...data
    };
    this.addBookLocalStorage(combinedData);
  }

  #setBooks = signal(this.#parseBooks());

  #parseBooks() {
    const parsedBooks = JSON.parse(localStorage.getItem(ELocalStorage.BOOK_LIST) || '[]');
    return parsedBooks;
  }

  findBookInLocalStorage(bookId: string) {
    const books = this.#parseBooks();
    const foundBook = books.find((book: any) => book.id === bookId);
    return foundBook;
  }

  addBookLocalStorage(book: any): void {
    const books = this.#parseBooks();
    const updatedBooks = [...books, book];
    localStorage.setItem(ELocalStorage.BOOK_LIST, JSON.stringify(updatedBooks));
    this.bookDetail = book;
    this.#setBooks.set(this.#parseBooks());
  }
}
