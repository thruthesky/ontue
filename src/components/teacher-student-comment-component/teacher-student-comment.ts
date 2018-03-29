import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {ModalController} from "ionic-angular";
import {StudentCommentList} from "../student-comment-list/student-comment-list";
import {StudentCommentEdit} from "../student-comment-edit/student-comment-edit";

@Component({
  selector: 'teacher-student-comment-component',
  templateUrl: 'teacher-student-comment.html'
})
export class TeacherStudentCommentComponent implements OnInit  {

  @Input() student_comments = [];

  idx_teacher = null;

  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {

    }

  ngOnInit() { }

  onClickCommentList(student_comments) {
    this.idx_teacher= student_comments.idx_teacher;
    const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: this.idx_teacher, teacher_name:student_comments.teacher_name,teacher_photoURL:student_comments.teacher_photoURL }, { cssClass: 'student-comment-list' }
    );
    createCommentModal.onDidDismiss(reason => {
      if (reason == 'commentCreate') this.onClickCommentCreate();
    });
    createCommentModal.present();
  }

  onClickCommentCreate() {
    const createCommentModal = this.modalCtrl.create(StudentCommentEdit, { idx_teacher: this.idx_teacher }, { cssClass: 'student-comment-create' }
    );
    createCommentModal.onDidDismiss(res => {
      if (res == 'success') this.onClickCommentList(this.idx_teacher);
    });
    createCommentModal.present();
  }


}
