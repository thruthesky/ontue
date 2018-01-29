import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'how-to-register-component',
  templateUrl: 'how-to-register.html'
})

export class HowToRegisterComponent {

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
