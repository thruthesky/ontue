import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {ViewController} from "ionic-angular";
@Component({
  selector: 'how-to-install-kakao-desktop-component',
  templateUrl: 'how-to-install-kakao-desktop.html'
})

export class HowToInstallKakaoDesktopComponent {

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
