import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'student-comment-create',
  templateUrl: 'student-comment-create.html'
})
export class StudentCommentCreate{


  params;
  idx_teacher;
  comment= '';
  rate = 1;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = navParams.data;
    this.idx_teacher = this.params['idx_teacher'];
  }



  onClickSubmit() {

    if( this.comment.length < 10 ) {
      this.a.alert("Comment cant be empty or too short...");
      return;
    }

    let data = {
      idx_teacher: this.idx_teacher,
      comment: this.comment,
      rate: this.rate
    };
    this.a.lms.student_comment_to_teacher_create(data).subscribe(res => {
      console.log("student_comment_to_teacher_create", res);
      if(res && res.idx) {
        this.a.alert("Comment Write Success...");
        this.viewCtrl.dismiss();
      }
    }, e => {
        this.a.alert(e);
    })
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
