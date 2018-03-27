import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {StudentCommentEdit} from "../../components/student-comment-edit/student-comment-edit";
import {AlertController, ModalController} from "ionic-angular";
import {StudentCommentList} from "../../components/student-comment-list/student-comment-list";

@Component({
  selector: 'class-comment-page',
  templateUrl: 'class-comment.html'
})
export class ClassCommentPage {


  comments = [];

  pageOption = {
    limitPerPage: 10,
    currentPage: 1,
    limitPerNavigation: 4,
    totalRecord: 0
  };

  idx_teacher= null;

  constructor(
    public a: AppService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.loadClassComment();
  }


  loadClassComment() {
    this.a.lms.get_latest_student_comment_to_teachers({
      limit:this.pageOption['limitPerPage'],
      page: this.pageOption['currentPage']
    }).subscribe( res => {
      // console.log("loadClassComment:: ", res);
      this.comments = res['comments'];
      this.pageOption.currentPage = res['page'];
      this.pageOption.limitPerPage = res['limit'];
      this.pageOption.totalRecord = res['total'];
    }, e => {
      this.a.alert(e);
    });

  }


  onClickDelete(comment){
    // console.log('user.id', this.a.user.id);
    // console.log("onClickDelete:: ", comment);

    let confirm = this.alertCtrl.create({
      title: this.a.i18n["DELETE COMMENT"],
      message: this.a.i18n["CONFIRM DELETE"],
      buttons: [
        {
          text: this.a.i18n["YES"],
          handler: () => {
            // console.log('Yes');
            this.a.showLoader();
            let data = {
              idx: comment.idx
            };
            this.a.lms.student_comment_to_teacher_delete(data).subscribe( res => {
              // console.log("student_comment_to_teacher_delete:: ", res);
              if( res['idx'] == comment.idx ) {
                comment.idx = '';
                this.a.alert(this.a.i18n['COMMENT DELETED']);
              }
              this.a.hideLoader();
            }, e => {
              this.a.showError(e);
              this.a.hideLoader();
            });
          }
        },
        {
          text: this.a.i18n["CANCEL"],
          handler: () => {
            // console.log('cancel');
          }
        }
      ]
    });
    confirm.present();
  }



  onClickCommentEdit(comment) {
    const createCommentModal = this.modalCtrl.create( StudentCommentEdit, {comment: comment},{cssClass: 'student-comment-edit'}
    );
    createCommentModal.onDidDismiss( res => {
      if(res == 'success') this.loadClassComment();
    });
    createCommentModal.present();
  }


  onClickShowMore(comment) {
    this.idx_teacher= comment.idx_teacher;
    const createCommentModal = this.modalCtrl.create(StudentCommentList, { idx_teacher: comment.idx_teacher }, { cssClass: 'student-comment-list' }
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
      if (res == 'success') this.onClickShowMore({idx_teacher: this.idx_teacher});
    });
    createCommentModal.present();
  }


  onPostPageClick( $event ) {
    this.pageOption['currentPage'] = $event;
    this.loadClassComment();
  }

}

