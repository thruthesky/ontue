import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {ModalController} from "ionic-angular";
import {StudentCommentList} from "../student-comment-list/student-comment-list";

@Component({
  selector: 'teacher-student-comment-component',
  templateUrl: 'teacher-student-comment.html'
})
export class TeacherStudentCommentComponent implements OnInit  {

  @Input() student_comments = [];

  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
    
    }

  ngOnInit() { }
  
  onClickCommentList(idx_teacher) {
    const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: idx_teacher }, { cssClass: 'student-comment-list' }
    );
    createCommentModal.onDidDismiss(() => { });
    createCommentModal.present();
  }

}
