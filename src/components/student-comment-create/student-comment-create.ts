import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'student-comment-create',
  templateUrl: 'student-comment-create.html'
})
export class StudentCommentCreate{


  params;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = navParams.data;
  }




  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
