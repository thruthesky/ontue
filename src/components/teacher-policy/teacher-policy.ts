import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'teacher-policy-component',
  templateUrl: 'teacher-policy.html'
})

export class TeacherPolicyComponent {

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
