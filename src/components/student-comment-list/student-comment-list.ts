import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'student-comment-list',
  templateUrl: 'student-comment-list.html'
})
export class StudentCommentList{


  params;
  idx_teacher;
  comments = [];
  limit = 10;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = navParams.data;
    this.idx_teacher = this.params['idx_teacher'];
    let data = {
      idx_teacher:this.idx_teacher,
      limit: this.limit
    };
    this.a.lms.get_student_comments_to_teacher_ID(data).subscribe( res => {
      console.log("get_comment_from_student_to_teaceher:: ", res);
      if(res) {
        this.comments = res;
      }
    }, e => {
      this.a.alert(e);
    })

  }


  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
