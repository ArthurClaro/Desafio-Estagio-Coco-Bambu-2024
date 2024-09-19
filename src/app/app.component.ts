import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import BookDetailsComponent from './modules/goodreads/pages/book-details/book-details.component';
import HomeComponent from './modules/goodreads/pages/home/home.component';
import MyFavoritsComponent from './modules/goodreads/pages/my-favorits/my-favorits.component';
import NotFoundComponent from './modules/goodreads/pages/not-found/not-found.component';
import { HeaderComponent } from './modules/goodreads/components/header/header.component';
import { FooterComponent } from './modules/goodreads/components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, BookDetailsComponent, MyFavoritsComponent, NotFoundComponent
    , HeaderComponent, FooterComponent 
  ],
  template: `
<app-header/>
  <router-outlet>

</router-outlet>
<app-footer/>
  
  `
})
export class AppComponent {
  title = 'goodreads';


}

