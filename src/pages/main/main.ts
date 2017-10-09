import { Component } from '@angular/core';
import { ShareService } from './../../providers/share.service';


@Component({
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(
    public s: ShareService
  ) {

  }
}
