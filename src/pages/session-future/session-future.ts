import { Component } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';

@Component({
  selector: 'page-session-future',
  templateUrl: 'session-future.html'
})
export class SessionFuturePage {

  share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> { options: false };
  constructor(
    public a: AppService
  ) {
    console.log("Future Sessions");
  }

}
