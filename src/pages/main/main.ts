import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { SchedulePage } from './../schedule/schedule';
import { ForumPage } from './../forum/forum';
import { MenuPage } from './../menu/menu';


@Component({
  templateUrl: 'main.html'
})
export class MainPage {

  HomePage = HomePage;
  SchedulePage = SchedulePage;
  ForumPage = ForumPage;
  MenuPage = MenuPage;
  
  constructor(
    
  ) {

  }
}
