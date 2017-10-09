import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AppService } from './../../providers/app.service';
import { ShareService } from './../../providers/share.service';


@Component({
  selector: 'login-box-component',
  templateUrl: 'login-box.html'
})
export class LoginBoxComponent {

  constructor(
      public navCtrl: NavController,
      public a: AppService,
      public s: ShareService
    ) {
      
  }

  ngAfterViewInit() { // TEST
    if ( this.a.test.register ) this.navCtrl.push( this.s.pages.register.component );
    if ( this.a.test.login ) this.navCtrl.push( this.s.pages.login.component );
  }


  onClickLogin() {
    console.log("onClickLogin()...");
    this.navCtrl.push( this.s.pages.login.component )
  }

  onClickRegister() {
    this.navCtrl.push( this.s.pages.register.component );
  }


}
