import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http = inject(HttpClient)


  public search = '';
  get #urlBooks(): string {
    return `${environment.apiBooksBaseUrl}?q=${this.search}&key=${environment.apiBooksKey}`;
  }

  // // get all 
  #setAllBooks = signal<any>(null)
  get getAllBooks() {
    return this.#setAllBooks.asReadonly();
  }
  #setAllBooksError = signal<any>(null)
  get getAllBooksError() {
    return this.#setAllBooksError.asReadonly();
  }
  public httpAllBooks$(value: string): Observable<any> {

    this.search = value;

    this.#setAllBooks.set(null)
    this.#setAllBooksError.set(null)
    return this.#http.get<any>(this.#urlBooks).pipe(
      shareReplay(),
      tap((res) => this.#setAllBooks.set(res)),
      catchError((error: HttpErrorResponse) => {
        this.#setAllBooksError.set(error.error.message);
        return throwError(() => error);
      })

    )
  }

  // GET ID

  public bookId = '';
  get #urlBook(): string {
    return `${environment.apiBooksBaseUrl}/${this.bookId}?key=${environment.apiBooksKey}`;
  }

  #setBookId = signal<any>(null)
  get getBookId() {
    return this.#setBookId.asReadonly();
  }
  #setBookIdErro = signal<any>(null)
  get getBookIdErro() {
    return this.#setBookIdErro.asReadonly();
  }

  public httpBookId$(id: string): Observable<any> {
    this.bookId = id;
    this.#setBookId.set(null)
    this.#setBookIdErro.set(null)
    return this.#http.get<any>(`${this.#urlBook}`).pipe(
      shareReplay(),
      tap((res) => this.#setBookId.set(res)),
      catchError((error: HttpErrorResponse) => {
        this.#setBookIdErro.set(error.error.message);
        return throwError(() => error);
      })
    )
  }
}
