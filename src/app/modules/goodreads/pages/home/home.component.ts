import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

// PrimeNg
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive,SkeletonModule,FormsModule, RatingModule
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
        console.log(response); // Exibe no console os itens recebidos
        // Para cada item da resposta, adiciona um valor aleatório de rating
        this.books = (response.items || []).map((item: any) => {
          return {
            ...item,
            randomRating: this.getRandomValue(0, 5) // Gera um valor aleatório entre 0 e 5
          };
        });
        console.log(this.books)

      },
      error: (error) => {
        console.log(error);
        this.books = []; // Reseta a lista de livros em caso de erro
      }
    });
  }

  // Função para gerar valor aleatório
  getRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // #cdr = inject(ChangeDetectorRef)
  @ViewChild('search') public search!: ElementRef
  @ViewChild('booksSection') public booksSection!: ElementRef; // Referência ao article

public nameSearch:string =''
  public searchBookOrAuthor(value: string) {
    if (value) {
      console.log(value); // Para verificar a entrada
      this.nameSearch= value
      this.searchBooks(value); // Faz a pesquisa com o valor inserido
      // this.#cdr.detectChanges();
      this.scrollToBooks(); // Rolando para a seção de livros após a busca
      this.search.nativeElement.value = ''
    }
  }
  // Método para rolar até a seção de livros
  private scrollToBooks(): void {
    this.booksSection.nativeElement.scrollIntoView({ behavior: 'smooth' }); // Rolagem suave até a seção de livros
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




}
