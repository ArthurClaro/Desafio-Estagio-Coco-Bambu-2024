import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { ApiResponse, BookDetail, BookItem } from '../../interface/IBooksItems.interface';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SkeletonModule,
    FormsModule,
    RatingModule
  ]
})
export default class HomeComponent {
  #apiService = inject(ApiService);
  #router = inject(Router);

  @ViewChild('search') public search!: ElementRef;
  @ViewChild('booksSection') public booksSection!: ElementRef;

  public books: BookItem[] = [];
  public nameSearch: string = '';
  public bookDetail: BookDetail | null = null;
  public searchValue = 'Maquiavel';
  
  ngOnInit(): void {
    this.searchBooks(this.searchValue);
  }

  public searchBooks(value: string): void {
    this.#apiService.httpAllBooks$(value).subscribe({
      next: (response: ApiResponse) => {
        this.books = (response.items || []).map(item => ({
          ...item,
          randomRating: this.getRandomValue(0, 5)
        }));
      },
      error: () => {
        this.books = [];
      }
    });
  }

  public searchBookOrAuthor(value: string): void {
    if (value) {
      this.nameSearch = value;
      this.searchBooks(value);
      this.scrollToBooks();
      this.search.nativeElement.value = '';
    }
  }

  private scrollToBooks(): void {
    this.booksSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public clickBookDetails(id: string): void {
    if (id) {
      this.bookDetails(id);
    }
  }

  private bookDetails(id: string): void {
    this.#apiService.httpBookId$(id).subscribe({
      next: (response: BookDetail) => {
        this.bookDetail = response;
        this.#router.navigate([`/book-details/${response.id}`], {
          state: { bookDetail: response }
        });
      },
      error: () => {
        this.bookDetail = null;
      }
    });
  }

  private getRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
