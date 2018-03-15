import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';
@Component({
  selector: 'session-past-page',
  templateUrl: 'session-past.html'
})
export class SessionPastPage {

  page = 'session-past';
  share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST>{ options: false };
  showLevel = false;
  myLevel: any = '로딩중...';
  constructor(
    public a: AppService,
    navParam: NavParams
  ) {
    this.showLevel = navParam.get('showLevel');
    // console.log("Past Sessions: ", navParam.get('showLevel'));

    if ( this.showLevel ) {
      this.a.lms.get_my_level().subscribe(re => {
        // console.log('my level', re);
        this.myLevel = re['level'];
      }, e => this.a.alert(e));
    }
  }

}
