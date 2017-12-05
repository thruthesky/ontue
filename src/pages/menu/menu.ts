import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {


  constructor(
    public a: AppService
  ) {



    // test
    // setTimeout(() => this.presentChooseUserTypeModal(), 50);
  }

}


