import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'student-comment-list',
  templateUrl: 'student-comment-list.html'
})
export class StudentCommentList{


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
