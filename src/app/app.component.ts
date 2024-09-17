import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import BookDetailsComponent from './modules/goodreads/pages/book-details/book-details.component';
import HomeComponent from './modules/goodreads/pages/home/home.component';
import MyFavoritsComponent from './modules/goodreads/pages/my-favorits/my-favorits.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HomeComponent,BookDetailsComponent,MyFavoritsComponent],
  template: `<router-outlet>



  </router-outlet>`
})
export class AppComponent {
  title = 'goodreads';

  
}

