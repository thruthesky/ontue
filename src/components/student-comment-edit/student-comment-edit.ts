import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';
import {STUDENT_COMMENT_TO_TEACHER} from "../../angular-xapi/interfaces";

@Component({
  selector: 'student-comment-edit',
  templateUrl: 'student-comment-edit.html'
})
export class StudentCommentEdit {


  params;
  data: STUDENT_COMMENT_TO_TEACHER = <STUDENT_COMMENT_TO_TEACHER>{};

  comment= '';
  rate = 1;

  loading = false;

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
      this.a.alert("코멘트가 너무 짧습니다.");
      return;
    }

    this.data['comment'] = this.comment;
    this.data['rate'] = this.rate;

    if(this.loading) return;
    this.loading = true;



    // console.log("data::", this.data);
    this.a.lms.student_comment_to_teacher_edit( this.data ).subscribe(res => {
      this.a.onStudentCommentToTeacher();
      // console.log("student_comment_to_teacher_edit", res);
        this.a.alert("코멘트를 작성하였습니다.");
        // this.viewCtrl.dismiss({comment:res['comment']});
        this.loading = false;
        this.viewCtrl.dismiss('success');
    }, e => {
        this.loading = false;
        this.a.alert(e);
    })
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
