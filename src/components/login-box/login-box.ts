import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'login-box-component',
  templateUrl: 'login-box.html'
})
export class LoginBoxComponent {

  constructor(
      public a: AppService
    ) {

  }
}
