import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {ViewController} from "ionic-angular";
@Component({
  selector: 'how-to-get-kakao-id-component',
  templateUrl: 'how-to-get-kakao-id.html'
})

export class HowToGetKakaoIDComponent {

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
