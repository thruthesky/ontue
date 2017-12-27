import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reminders = '';
  stats;
  showMoreMyOwnPlan_1 = false;
  showMoreMyOwnPlan_2 = false;
  showMoreMyOwnPlan_3 = false;
  constructor(
    public navCtrl: NavController,
    public a: AppService
  ) {
    // a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e));

    // a.alert('Hello, Alert !');
    // a.alert( { title: 'title', subTitle: 'subtitle', message: 'message', text: 'YES', callback: () => {
    //   console.log( this );
    // } } );
    // a.alert( new Error('This is an error alert') );


    // setTimeout(() => this.a.open('menu') , 200);

    a.lms.stats().subscribe( re => this.stats = re, e => a.alert(e) );

    // this.showMoreMyOwnPlan();
  }


  ionViewDidLoad() {

  }



  ngAfterViewInit() {
    //
  }

  showMoreMyOwnPlan() {
    setTimeout( () => this.showMoreMyOwnPlan_1 = true, 100 );
    setTimeout( () => this.showMoreMyOwnPlan_2 = true, 300 );
    setTimeout( () => this.showMoreMyOwnPlan_3 = true, 500 );
  }




}
