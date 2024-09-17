import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DialogConfirmComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export default class BookDetailsComponent implements OnInit {
  @ViewChild(DialogConfirmComponent) dialogConfirm!: DialogConfirmComponent;
  // Função para abrir o diálogo usando o ViewChild

  openDialog() {
    this.dialogConfirm.showDialog(); // Abre o modal
  }

  handleConfirm(data: any) {
    // console.log('Dados do formulário recebidos:', data);
      const combinedData = {
      ...this.bookDetail, 
      ...data, 
    };
      this.addBookLocalStorage(combinedData);
  }

  #route = inject(ActivatedRoute)
  #router = inject(Router)


  public bookDetail: any;
  constructor(private router: Router) {
    // Pegando o estado (bookDetail) passado pela navegação
    const navigation = this.router.getCurrentNavigation();
    this.bookDetail = navigation?.extras.state?.['bookDetail'];
  }


  ngOnInit(): void {
    const bookId = this.#route.snapshot.params['id']; // Obtém o ID da rota
    const existingBook = this.findBookInLocalStorage(bookId);

    if (existingBook) {
      // Se o livro já existir no localStorage, use o objeto encontrado
      this.bookDetail = existingBook;
      console.log('Livro encontrado no localStorage:', existingBook);
    } else {
      console.log('livro não encontrado na localStorage', this.bookDetail)
      if (!this.bookDetail || !this.bookDetail.volumeInfo) {
        this.router.navigate(['/']);
      }
    }
  }

  #setBooks = signal(this.#parseBooks())

  #parseBooks() {
    return JSON.parse(localStorage.getItem('@book-detail-list') || '[]')
  }

  findBookInLocalStorage(bookId: string) {
    const books = this.#parseBooks(); // Busca todos os livros no localStorage
    return books.find((book: any) => book.id === bookId); // Verifica se o livro com o id já existe
  }

  public addBookLocalStorage(book: any) {
    const books = this.#parseBooks(); // Obtém os livros existentes
    localStorage.setItem('@book-detail-list', JSON.stringify([...books, book])); // Adiciona o novo livro
    console.log('Livro adicionado ao localStorage:', book);

    // Atualiza o estado local do componente para refletir a mudança
    this.bookDetail = book;

    // Também atualiza o sinal (ou estado de gerenciamento) que contém os livros
    this.#setBooks.set(this.#parseBooks());
  }



}
