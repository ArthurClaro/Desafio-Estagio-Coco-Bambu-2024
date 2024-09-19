import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { ELocalStorage } from '../../enum/ELocalStorage';

@Component({
  selector: 'app-my-favorits',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, FormsModule,SkeletonModule,DatePipe,RatingModule],
  templateUrl: './my-favorits.component.html',
  styleUrl: './my-favorits.component.scss'
})
export default class MyFavoritsComponent {
  public favoriteBooks: any[] = [];
  public filteredBooks: any[] = []; 
  public newTag: { [key: string]: string } = {}; 
  public filterTag: string = ''; 

  ngOnInit() {
    this.getFavoriteBooks(); 
    this.filteredBooks = [...this.favoriteBooks]; 
  }

  getFavoriteBooks() {
    const books = JSON.parse(localStorage.getItem(ELocalStorage.BOOK_LIST) || '[]');
    this.favoriteBooks = books.filter((book: any) => book.favorite === true).map((book: any) => {
      if (typeof book.tags === 'string') {
        book.tags = book.tags.split(',');
      } else if (!Array.isArray(book.tags)) {
        book.tags = []; 
      }
      return book;
    });
    this.filteredBooks = [...this.favoriteBooks];
  }

  updateBook(updatedBook: any) {
    const books = JSON.parse(localStorage.getItem(ELocalStorage.BOOK_LIST) || '[]'); 
    const bookIndex = books.findIndex((book: any) => book.id === updatedBook.id); 
    if (bookIndex !== -1) {
      books[bookIndex] = updatedBook; 
      localStorage.setItem(ELocalStorage.BOOK_LIST, JSON.stringify(books)); 
    }
  }

  toggleFavorite(book: any) {
    this.updateBook(book);
    if (!book.favorite) {
      this.removeBook(book);
    } else {
      this.getFavoriteBooks();
    }
  }

  removeBook(bookToRemove: any) {
    const books = JSON.parse(localStorage.getItem(ELocalStorage.BOOK_LIST) || '[]');
    const updatedBooks = books.filter((book: any) => book.id !== bookToRemove.id); 
    localStorage.setItem(ELocalStorage.BOOK_LIST, JSON.stringify(updatedBooks));
    this.getFavoriteBooks(); 
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  addTag(book: any) {
    const tag = this.newTag[book.id]?.trim(); 
    if (tag && tag.length > 0) {
      if (!Array.isArray(book.tags)) {
        book.tags = []; 
      }
      if (book.tags.length >= 3) {
        return; 
      }
      book.tags.push(tag);
      this.newTag[book.id] = ''; 
      this.updateBook(book); 
    }
  }

  removeTag(book: any, index: number) {
    if (Array.isArray(book.tags)) {
      book.tags.splice(index, 1);
      this.updateBook(book); 
    }
  }

  filterByTag() {
    if (this.filterTag.trim() === '') {
      this.filteredBooks = [...this.favoriteBooks];
    } else {
      this.filteredBooks = this.favoriteBooks.filter(book =>
        book.tags.some((tag: any) => tag.toLowerCase().includes(this.filterTag.toLowerCase()))
      );
    }
  }

  clearFilter() {
    this.filterTag = '';
    this.filteredBooks = [...this.favoriteBooks]; 
  }
  
}
