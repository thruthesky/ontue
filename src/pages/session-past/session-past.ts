import { Component } from '@angular/core';

import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';
@Component({
  selector: 'session-past-page',
  templateUrl: 'session-past.html'
})
export class SessionPastPage {

  page = 'session-past';
  share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> { options: false };
  constructor(
    public a: AppService
  ) {
    console.log("Past Sessions");
  }

}
