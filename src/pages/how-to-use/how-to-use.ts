import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
  selector: 'how-to-use-page',
  templateUrl: 'how-to-use.html'
})
export class HowToUsePage {

  showKakaoInstall = false;
  showQRMark = false;


  constructor(
    public a: AppService
  ) {

  }


}

