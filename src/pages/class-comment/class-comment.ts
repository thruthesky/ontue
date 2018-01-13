import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
  selector: 'class-comment-page',
  templateUrl: 'class-comment.html'
})
export class ClassCommentPage {


  comments = [];

  constructor(
    public a: AppService
  ) {


    this.loadClassComment();

  }


  loadClassComment() {

    this.a.lms.get_latest_student_comment_to_teachers().subscribe( res => {
      console.log("loadClassComment:: ", res);
      this.comments = res;
    }, e => {
      this.a.alert(e);
    });

  }




}

