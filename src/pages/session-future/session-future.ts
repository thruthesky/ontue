import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'page-session-future',
  templateUrl: 'session-future.html'
})
export class SessionFuturePage {

  constructor(
    public a: AppService
  ) {
    console.log("Future Sessions");
  }

}
