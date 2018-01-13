import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'student-comment-edit',
  templateUrl: 'student-comment-edit.html'
})
export class StudentCommentEdit {


  params;
  idx_teacher;
  data = {};

  comment= '';
  rate = 1;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = navParams.data;

    // create
    if(this.params['idx_teacher']) {
      this.data['idx_teacher'] = this.params['idx_teacher'];
    }

    // edit
    if( this.params['comment'] ) {
      this.data = Object.assign({} ,this.params['comment']);
      this.rate = this.data['rate'];
      this.comment = this.data['comment'];
    }

  }



  onClickSubmit() {

    if( this.comment.length < 10 ) {
      this.a.alert("Comment cant be empty or too short...");
      return;
    }

    this.data['comment'] = this.comment;
    this.data['rate'] = this.rate;

    // console.log("data::", this.data);
    this.a.lms.student_comment_to_teacher_edit( this.data ).subscribe(res => {
      console.log("student_comment_to_teacher_edit", res);
        this.a.alert("Comment Write Success...");
        // this.viewCtrl.dismiss({comment:res['comment']});
        this.viewCtrl.dismiss('success');
    }, e => {
        this.a.alert(e);
    })
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
