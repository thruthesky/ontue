import { Component, OnInit } from '@angular/core';
import {AppService} from "../../providers/app.service";
import {StudentCommentList} from "../student-comment-list/student-comment-list";
import {ModalController} from "ionic-angular";

@Component({
    selector: 'home-teacher-content-component',
    templateUrl: 'home-teacher-content.html'
})

export class HomeTeacherContentComponent implements OnInit {


    site_info = {
      comment_from_student: [],
      comment_from_teacher: [],
      no_of_past: 0,
      no_of_reservations: 0,
      no_of_student: 0,
      no_of_teacher: 0,
      recent_graded_teachers: [],
      recent_reservations: []
    };

    constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
      this.a.lms.get_teacher_site_info().subscribe( res => {
          console.log("site info", res);
          this.site_info = res['site_info'];
      }, () => {})

    }



  onClickCommentList(idx_teacher) {
    const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: idx_teacher }, { cssClass: 'student-comment-list' }
    );
    createCommentModal.onDidDismiss(() => { });
    createCommentModal.present();
  }

    ngOnInit() { }


}
