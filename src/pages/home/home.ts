import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reminders = '';
  constructor(
    public navCtrl: NavController,
    public a: AppService
  ) {
    a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e.message));
  }


  ionViewDidLoad() {
    
  }


  

  ngAfterViewInit() {
    // setTimeout(() => this.a.open('menu') , 200);
  }


}
