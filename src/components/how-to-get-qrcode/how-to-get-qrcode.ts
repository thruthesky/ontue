import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {ViewController} from "ionic-angular";
@Component({
  selector: 'how-to-get-qrcode-component',
  templateUrl: 'how-to-get-qrcode.html'
})

export class HowToGetQRCodeComponent {

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
