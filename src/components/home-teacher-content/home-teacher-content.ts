import { Component, OnInit } from '@angular/core';
import {AppService} from "../../providers/app.service";
import {StudentCommentList} from "../student-comment-list/student-comment-list";
import {ModalController} from "ionic-angular";
import {HowToGetQRCodeComponent} from "../how-to-get-qrcode/how-to-get-qrcode";
import {HowToGetKakaoIDComponent} from "../how-to-get-kakao-id/how-to-get-kakao-id";
import {TeacherPolicyComponent} from "../teacher-policy/teacher-policy";
import {HowToInstallKakaoMobileComponent} from "../how-to-install-kakao-mobile/how-to-install-kakao-mobile";
import {StudentCommentEdit} from "../student-comment-edit/student-comment-edit";

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


  _modal = {
    teacherPolicy: TeacherPolicyComponent,
    kakaoInstall: HowToInstallKakaoMobileComponent,
    kakaoID: HowToGetKakaoIDComponent,
    qrmark: HowToGetQRCodeComponent
  };


  idx_teacher = null;


    constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
      this.a.lms.get_teacher_site_info().subscribe( res => {
          // console.log("site info::", res);
          this.site_info = res['site_info'];
      }, () => {})

    }



  onClickCommentList(idx_teacher) {
    this.idx_teacher= idx_teacher;
    const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: idx_teacher }, { cssClass: 'student-comment-list' }
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


  ngOnInit() { }


  showModalFAQ(modal_name){
    const modal = this.modalCtrl.create( this._modal[modal_name] );
    modal.onDidDismiss(()=> {});
    modal.present();
  }

}
