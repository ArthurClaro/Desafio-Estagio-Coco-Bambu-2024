import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http = inject(HttpClient)
  #url = signal(environment.api)


  // #urlBooks = signal(environment.apiBooks)
  // #urlBooks = `https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyAnkLK7se_lJIeR47gyqoOgRnj82deARfk`


  

  public search = '';  // Dinamicamente atualizado
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
  public httpAllBooks$(value:string): Observable<any> {

    this.search = value;  // Atualizando o valor da busca

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


  public bookId = '';  // Dinamicamente atualizado
  get #urlBook(): string {
    // id do livro, quando clicar !:
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
    // this.bookId = 'ZGFCEAAAQBAJ'; 

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

  // /////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////

  // // get all 
  // #setListTask = signal<any>(null)
  // get getListTask() {
  //   return this.#setListTask.asReadonly();
  // }
  // #setListTaskError = signal<any>(null)
  // get getListTaskError() {
  //   return this.#setListTaskError.asReadonly();
  // }
  // public httpListTask$(): Observable<any> {
  //   const headers = new HttpHeaders().set('x-vida', 'dev')
  //   const params = new HttpParams().set('page', '1').set('previous_page', '1')
  // page=1&previous_page=2
  //   this.#setListTask.set(null)
  //   this.#setListTaskError.set(null)
  //   return this.#http.get<any>(this.#url(), { headers, params }).pipe(
  //     shareReplay(),
  //     tap((res) => this.#setListTask.set(res)),
  //     catchError((error: HttpErrorResponse) => {
  //       this.#setListTaskError.set(error.error.message);
  //       return throwError(() => error);
  //     })

  //   )
  // }


  // // ///////////// get id 
  // #setTaskId = signal<any>(null)
  // get getTaskId() {
  //   return this.#setTaskId.asReadonly();
  // }
  // #setTaskIdErro = signal<any>(null)
  // get getTaskIdErro() {
  //   return this.#setTaskIdErro.asReadonly();
  // }
  // public httpTaskId$(id: string): Observable<any> {
  //   this.#setTaskId.set(null)
  //   this.#setTaskIdErro.set(null)
  //   return this.#http.get<any>(`${this.#url()}/${id}`).pipe(
  //     shareReplay(),
  //     tap((res) => this.#setTaskId.set(res)),
  //     catchError((error: HttpErrorResponse) => {
  //       this.#setTaskIdErro.set(error.error.message);
  //       return throwError(() => error);
  //     })
  //   )
  // }



  // // ///// POST
  // #setCreateErro = signal<any>(null)
  // get getCreateErro() {
  //   return this.#setCreateErro.asReadonly();
  // }

  // public httpTaskCreate$(title: string): Observable<any> {
  //   this.#setCreateErro.set(null)
  //   return this.#http.post<any>(this.#url(), { title }).pipe(
  //     shareReplay(),
  //     catchError((error: HttpErrorResponse) => {
  //       this.#setCreateErro.set(error.error.message);
  //       return throwError(() => error);
  //     })
  //   )
  // }

  // // ///// UPDATE
  // #setUpdateErro = signal<any>(null)
  // get getUpdateErro() {
  //   return this.#setUpdateErro.asReadonly();
  // }
  // public httpTaskUpdate$(id: string, title: string): Observable<any> {
  //   this.#setUpdateErro.set(null)
  //   return this.#http.patch<any>(`${this.#url()}/${id}`, { title }).pipe(
  //     shareReplay(),
  //     catchError((error: HttpErrorResponse) => {
  //       this.#setUpdateErro.set(error.error.message);
  //       return throwError(() => error);
  //     })
  //   )
  // }



  // // ///// DELETE
  // #setDeleteErro = signal<any>(null)
  // get getDeleteErro() {
  //   return this.#setDeleteErro.asReadonly();
  // }
  // public httpTaskDelete$(id: string): Observable<any> {
  //   this.#setDeleteErro.set(null)
  //   return this.#http
  //     .delete<any>(`${this.#url()}/${id}`, {})
  //     .pipe(shareReplay(),
  //       catchError((error: HttpErrorResponse) => {
  //         this.#setDeleteErro.set(error.error.message);
  //         return throwError(() => error);
  //       }))
  // }

}
