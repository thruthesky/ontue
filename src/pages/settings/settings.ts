import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  tz = {};

  usetTZ = 0;
  constructor(public a: AppService) {

    a.lms.timezones().subscribe( re => {
      // console.log( re);
      this.tz = re;
    });

    if( a.user.isLogin ){
      a.lms.timezone().subscribe( re => {
        console.log('timezone', re);
        this.usetTZ = re['offset'];
      });
    }
  }

  keysTimezone() {
    return Object.keys( this.tz ).sort( ( a: any, b: any ) => a - b );
  }

  format( offset ) {
    if ( offset > 0 ) {
      return '+' + offset;
    }
    else return offset;
  }


  onClickTimezone( offset ) {
    console.log(offset);
    this.a.lms.timezone_set( offset ).subscribe( re => {
      console.log(re);
      this.a.user.loadProfile().subscribe( () => {} );
    }, e => this.a.alert(e) );
  }


}
