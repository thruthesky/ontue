import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {ViewController} from "ionic-angular";
@Component({
  selector: 'how-to-install-kakao-mobile-component',
  templateUrl: 'how-to-install-kakao-mobile.html'
})

export class HowToInstallKakaoMobileComponent {

  constructor(
    public a: AppService,
    public viewCtrl: ViewController
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {

  }


}
