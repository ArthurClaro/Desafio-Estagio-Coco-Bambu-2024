import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-my-favorits',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, FormsModule,SkeletonModule,DatePipe,RatingModule],
  templateUrl: './my-favorits.component.html',
  styleUrl: './my-favorits.component.scss'
})
export default class MyFavoritsComponent {
  public favoriteBooks: any[] = [];
  public filteredBooks: any[] = []; // Armazena os livros filtrados
  public newTag: { [key: string]: string } = {}; // Objeto para armazenar novas tags por livro (usando o id do livro)
  public filterTag: string = ''; // Armazena o valor da tag para o filtro

  ngOnInit() {
    this.getFavoriteBooks(); // Chama a função ao inicializar o componente
    this.filteredBooks = [...this.favoriteBooks]; // Inicializa a lista filtrada com todos os favoritos
  }


  // Função para retornar os livros que possuem 'favorite' como true
  getFavoriteBooks() {
    const books = JSON.parse(localStorage.getItem('@book-detail-list') || '[]');
    this.favoriteBooks = books.filter((book: any) => book.favorite === true).map((book: any) => {
      // Garante que o campo 'tags' é um array
      if (typeof book.tags === 'string') {
        book.tags = book.tags.split(','); // Converte uma string em um array, caso as tags estejam separadas por vírgula
      } else if (!Array.isArray(book.tags)) {
        book.tags = []; // Se não for array, inicializa como vazio
      }
      return book;
    });

    // Inicializa a lista filtrada com todos os livros favoritos
    this.filteredBooks = [...this.favoriteBooks];
    console.log('Livros favoritos:', this.favoriteBooks);
  }

  // Função para atualizar o livro no localStorage
  updateBook(updatedBook: any) {
    const books = JSON.parse(localStorage.getItem('@book-detail-list') || '[]'); // Busca os livros do localStorage
    const bookIndex = books.findIndex((book: any) => book.id === updatedBook.id); // Encontra o índice do livro

    if (bookIndex !== -1) {
      books[bookIndex] = updatedBook; // Atualiza o livro no array
      localStorage.setItem('@book-detail-list', JSON.stringify(books)); // Salva no localStorage
      console.log('Livro atualizado no localStorage:', books[bookIndex]); // Verifica se o localStorage foi atualizado corretamente
    }
  }

  // Função para alternar o status de favorito
  toggleFavorite(book: any) {
    // O valor de book.favorite já terá sido atualizado pelo [(ngModel)]
    console.log(book.favorite);

    // Atualiza o livro no localStorage
    this.updateBook(book);

    if (!book.favorite) {
      // Se o livro não for mais favorito, remove-o da lista
      this.removeBook(book);
    } else {
      // Atualiza a lista de favoritos caso o status seja alterado para favorito
      this.getFavoriteBooks();
    }
  }

  // Função para remover o livro dos favoritos
  removeBook(bookToRemove: any) {
    const books = JSON.parse(localStorage.getItem('@book-detail-list') || '[]');
    const updatedBooks = books.filter((book: any) => book.id !== bookToRemove.id); // Remove o livro da lista

    // Atualiza o localStorage com a nova lista
    localStorage.setItem('@book-detail-list', JSON.stringify(updatedBooks));

    // Atualiza a lista de livros favoritos na tela
    this.getFavoriteBooks(); // Chama para atualizar a lista exibida
  }

  // Função de trackBy para performance ao usar ngFor
  trackById(index: number, item: any): string {
    return item.id;
  }

  // Função para adicionar uma nova tag
  addTag(book: any) {
    const tag = this.newTag[book.id]?.trim(); // Obtém a nova tag associada ao livro
    if (tag && tag.length > 0) {
      if (!Array.isArray(book.tags)) {
        book.tags = []; // Se o campo 'tags' não for um array, inicializa como um array vazio
      }

      // Verifica se já existem 3 tags
      if (book.tags.length >= 3) {
        console.log('Não é possível adicionar mais de 3 tags');
        return; // Se já tiver 3 tags, não adiciona a nova
      }

      book.tags.push(tag); // Adiciona a nova tag
      this.newTag[book.id] = ''; // Limpa o campo de nova tag
      this.updateBook(book); // Atualiza o livro no localStorage
    }
  }

  // Função para remover uma tag
  removeTag(book: any, index: number) {
    if (Array.isArray(book.tags)) {
      book.tags.splice(index, 1); // Remove a tag pelo índice
      this.updateBook(book); // Atualiza o livro no localStorage
    }
  }

  // Função para filtrar os livros por tag
  filterByTag() {
    console.log('Tag para filtrar:', this.filterTag); // Verificar se o valor da tag está correto

    if (this.filterTag.trim() === '') {
      // Se o campo de filtro estiver vazio, mostra todos os livros favoritos
      this.filteredBooks = [...this.favoriteBooks];
    } else {
      // Filtra os livros que contêm a tag buscada
      this.filteredBooks = this.favoriteBooks.filter(book =>
        book.tags.some((tag: any) => tag.toLowerCase().includes(this.filterTag.toLowerCase()))
      );
    }

    console.log('Livros filtrados:', this.filteredBooks); // Verificar se a lista filtrada está correta
  }

  // Função para limpar o campo de filtro
  clearFilter() {
    this.filterTag = ''; // Limpa o valor do filtro
    this.filteredBooks = [...this.favoriteBooks]; // Redefine a lista de livros para todos os favoritos
  }


}
