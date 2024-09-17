import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

// PrimeNg



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  #apiService = inject(ApiService)

  public books: any[] = []; // Para armazenar os livros
  public searchValue = 'Maquiavel'; // Para mostrar enquanto carrega
  public bookDetail: any = {}; // Para armazenar os livros

  public getBooks = this.#apiService.getAllBooks
  public getBooksId = this.#apiService.getBookId

  ngOnInit(): void {
    this.searchBooks(this.searchValue); // Realiza uma busca inicial
  }

  public searchBooks(value: string) {
    this.#apiService.httpAllBooks$(value).subscribe({
      next: (response) => {
        // console.log(response); // Exibe no console os itens recebidos
        // console.log(response.items); // Exibe no console os itens recebidos
        this.books = response.items || []; // Atualiza a lista de livros
      },
      error: (error) => {
        console.log(error);
        this.books = []; // Reseta a lista de livros em caso de erro
      }
    });
  }


  // #cdr = inject(ChangeDetectorRef)
  @ViewChild('search') public search!: ElementRef


  public searchBookOrAuthor(value: string) {
    if (value) {
      console.log(value); // Para verificar a entrada
      this.searchBooks(value); // Faz a pesquisa com o valor inserido
      // this.#cdr.detectChanges();
      this.search.nativeElement.value = ''
    }
  }


  // ////////////////////////////////////////////
  @Output() public outputBookDetails = new EventEmitter()
  #router = inject(Router)
  // this.#router.navigate(['/'])

  public bookDetails(value: string) {
    this.#apiService.httpBookId$(value).subscribe({
      next: (response) => {
        console.log(response); // Exibe no console os itens recebidos
        this.bookDetail = response || []; // Atualiza a lista de livros
        // console.log(this.bookDetail.volumeInfo.title)

        // const tags: any = []
        // const favorite: any = false
        // const newArray = {
        //   ...this.bookDetail,
        //   tags,
        //   favorite,
        // }
        // console.log(newArray)

        // this.#router.navigate(['/book-details/1'])
        // this.outputBookDetails.emit(this.bookDetail)

        this.#router.navigate([`/book-details/${response.id}`], {
          state: { bookDetail: response || [] }
        });

      },
      error: (error) => {
        console.log(error);
        this.bookDetail = []; // Reseta a lista de livros em caso de erro
      }
    });
  }

  public clickBookDetails(value: string) {
    if (value) {
      // console.log(value);
      this.bookDetails(value);
    }
  }





  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  // ///////////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////


  // public getListTask = this.#apiService.getListTask
  // public getListTaskError = this.#apiService.getListTaskError

  // public getTaskId = this.#apiService.getTaskId
  // public getTaskIdError = this.#apiService.getTaskIdErro

  // public getCreateError = this.#apiService.getCreateErro
  // public getUpdateError = this.#apiService.getUpdateErro
  // public getDeleteError = this.#apiService.getDeleteErro

  // ngOnInit(): void {
  //   this.#apiService.httpListTask$().subscribe();
  //   this.#apiService.httpTaskId$('sjkvADM2rjKOGNMLPid0 ').subscribe();
  // }

  // public httpTaskCreate(title: string) {
  //   return this.#apiService
  //     .httpTaskCreate$(title)
  //     .pipe(concatMap(() => this.#apiService.httpListTask$()))
  //     .subscribe({
  //       next: (next) => console.log(next),
  //       error: (error) => console.log(error),
  //     })
  // }

  // public httpTaskUpdate(id: string, title: string) {
  //   return this.#apiService
  //     .httpTaskUpdate$(id, title)
  //     .pipe(concatMap(() => this.#apiService.httpListTask$()))
  //     .subscribe()
  // }

  // public httpTaskDelete(id: string) {
  //   return this.#apiService
  //     .httpTaskDelete$(id)
  //     .pipe(concatMap(() => this.#apiService.httpListTask$()))
  //     .subscribe()
  // }



}
