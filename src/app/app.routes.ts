import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        title: 'Home da página',
        loadComponent: () =>
            import('./modules/goodreads/pages/home/home.component'),
    },
    {
        path: 'book-details/:id',
        title: 'Detalhes do Livro',
        loadComponent: () =>
            import('./modules/goodreads/pages/book-details/book-details.component'),
    },
    {
        path: 'my-favorits',
        title: 'Meus favoritos',
        loadComponent: () =>
            import('./modules/goodreads/pages/my-favorits/my-favorits.component'),
    },
    {
        path: '**',
        title: 'Página não encontrada!',
        loadComponent: () =>
            import('./modules/goodreads/pages/not-found/not-found.component'),
    },
];
