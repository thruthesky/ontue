import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {AlertController, ModalController, NavParams, ViewController} from 'ionic-angular';
import {StudentCommentEdit} from "../student-comment-edit/student-comment-edit";
import {STUDENT_COMMENTS_TO_TEACHER} from "../../angular-xapi/interfaces";




@Component({
  selector: 'student-comment-list',
  templateUrl: 'student-comment-list.html'
})
export class StudentCommentList{



  params;
  idx_teacher;
  comments: STUDENT_COMMENTS_TO_TEACHER = <STUDENT_COMMENTS_TO_TEACHER>[] ;
  limit = 10;


  error = null;

  pageOption = {
    limitPerPage: 10,
    currentPage: 1,
    limitPerNavigation: 4,
    totalRecord: 0
  };

  loading = true;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.params = navParams.data;
    this.idx_teacher = this.params['idx_teacher'];
    this.loadCommentList();

  }


  loadCommentList() {
    let data = {
      idx_teacher:this.idx_teacher,
      limit: this.pageOption.limitPerPage,
      page: this.pageOption.currentPage
    };
    this.a.lms.get_student_comments_to_teacher(data).subscribe( (res:STUDENT_COMMENTS_TO_TEACHER) => {
      // console.log("get_comment_from_student_to_teaceher:: ", res);
      if( res && res['comments'] && res['comments'].length ) {
        this.comments = res['comments'];
      } else {
        this.error = "No available review yet for this teacher."
      }
      this.pageOption.currentPage = res['page'];
      this.pageOption.limitPerPage = res['limit'];
      this.pageOption.totalRecord = res['total']
      this.loading = false;
    }, e => {
      this.a.alert(e);
      this.loading = false;
    })
  }

  onClickDelete(comment){
    // console.log('user.id', this.a.user.id);
    // console.log("onClickDelete:: ", comment);

    let confirm = this.alertCtrl.create({
      title: this.a.i18n["DELETE COMMENT"],
      message: this.a.i18n["CONFIRM DELETE COMMENT"],
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
                this.a.alert("Comment Deleted...");
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
      // if(res && res['comment']) {
      //   console.log("comment", res['comment']);
      //   console.log("onClickCommentEdit::comment", comment);
      //   comment['comment'] = res.comment.comment;
      //   comment['rate'] = res.comment.rate;
      //   comment['rate'] = res.comment.rate;
      // }

      if(res == 'success') this.loadCommentList();
    });
    createCommentModal.present();
  }






  onClickCancel() {
    this.viewCtrl.dismiss();
  }

  onPostPageClick( $event ) {
    this.pageOption['currentPage'] = $event;
    this.loadCommentList();
  }

  onClickCommentCreate() {
    this.viewCtrl.dismiss('commentCreate');
  }


}
