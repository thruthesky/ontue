import { Component } from '@angular/core';

import { AppService } from '../../providers/app.service';
@Component({
  selector: 'page-session-past',
  templateUrl: 'session-past.html'
})
export class SessionPastPage {


  showOptions = false;
  constructor(
    public a: AppService
  ) {
    console.log("Past Sessions");
  }

}