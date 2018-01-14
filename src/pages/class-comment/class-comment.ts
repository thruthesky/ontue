import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {StudentCommentEdit} from "../../components/student-comment-edit/student-comment-edit";
import {AlertController, ModalController} from "ionic-angular";

@Component({
  selector: 'class-comment-page',
  templateUrl: 'class-comment.html'
})
export class ClassCommentPage {


  comments = [];

  constructor(
    public a: AppService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
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


  onClickDelete(comment){
    console.log('user.id', this.a.user.id);
    console.log("onClickDelete:: ", comment);

    let confirm = this.alertCtrl.create({
      title: 'Delete Comment',
      message: 'Are you sure you want to delete comment?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes');
            this.a.showLoader();
            let data = {
              idx: comment.idx
            };
            this.a.lms.student_comment_to_teacher_delete(data).subscribe( res => {
              console.log("student_comment_to_teacher_delete:: ", res);
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
          text: 'cancel',
          handler: () => {
            console.log('cancel');
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





}

