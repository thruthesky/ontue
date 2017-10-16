import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  userType = '';
  constructor(
      public navCtrl: NavController,
      public a: AppService
    ) {

  }

  onClickUserType() {
    console.log("type: ", this.userType);
    
  }

}
