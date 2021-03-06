import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  reminders = '';
  
  constructor(
    public navCtrl: NavController,
    platform: Platform,
    public a: AppService
  ) {
    // a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e));

    // a.alert('Hello, Alert !');
    // a.alert( { title: 'title', subTitle: 'subtitle', message: 'message', text: 'YES', callback: () => {
    //   console.log( this );
    // } } );
    // a.alert( new Error('This is an error alert') );


    // setTimeout(() => this.a.open('menu') , 200);

    // a.lms.stats().subscribe( re => this.stats = re, e => a.alert(e) );

    // this.showMoreMyOwnPlan();


    /**
     * Try to load all schedule table on front page.
     */
    platform.ready().then(() => {
      this.a.loadSchedule();
    });

  }


  ionViewDidLoad() {

  }



  ngAfterViewInit() {
    //
  }

}
