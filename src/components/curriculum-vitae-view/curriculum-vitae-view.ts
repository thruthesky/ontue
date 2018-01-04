import {Component} from '@angular/core';
import {AppService} from '../../providers/app.service';
import {NavParams, ViewController} from "ionic-angular";
import {USER_DATA_RESPONSE} from "../../angular-xapi/interfaces";


@Component({
  selector: 'curriculum-vitae-view',
  templateUrl: 'curriculum-vitae-view.html'
})

export class CurriculumVitaeView {

  teacher: USER_DATA_RESPONSE;


  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.teacher = navParams.data['teacher'];
    console.log("teacher:: ", this.teacher);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
