import {Component, Input} from '@angular/core';
import {AppService} from './../../providers/app.service';
import {
  POST, FILES,
  COMMENT
} from './../../angular-xapi/interfaces';
import {AlertController, ModalController} from "ionic-angular";
import {CommentEditPage} from "../comment-edit/comment-edit";


@Component({
  selector: 'comment-view-widget',
  templateUrl: 'comment-view.html'
})

export class CommentViewWidget {

  @Input() post: POST;
  @Input() comment: COMMENT;
  files: FILES = [];
  comment_content: string;
  showReply: boolean = false;

  mouse: 'in' | 'out' = 'out';
  timeout = 600;
  closingTimeout = 400;

  likeLoader = false;

  constructor(public a: AppService,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController
  ) {

  }

  onCreate() {
    this.showReply = false;
  }

  onClickEdit() {
    const createCommentModal = this.modalCtrl.create(CommentEditPage, {post: this.post, comment: this.comment});
    createCommentModal.onDidDismiss(comment => {
      if (comment) {
        console.log('ID:: ', comment);
        this.updateComment(comment);
      }
    });
    createCommentModal.present();
  }

  onClickDelete() {

    if (this.a.user.isLogin) {

      let confirm = this.alertCtrl.create({
        title: 'Delete Comment',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes');
              this.a.showLoader();
              this.a.forum.commentDelete(this.comment.comment_ID).subscribe(res => {
                console.log('success delete: ', res);
                if (res.mode == 'mark') {
                  this.updateComment(this.comment);
                }
                else {
                  let index = this.post.comments.findIndex(comment => comment.comment_ID == res.comment_ID);
                  this.post.comments.splice(index, 1);
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
  }

  updateComment(oComment: COMMENT) {
    this.a.showLoader();
    this.a.forum.commentData(oComment.comment_ID).subscribe((comment: COMMENT) => {
      let depth = oComment.depth;
      Object.assign(oComment, comment);
      oComment.depth = depth;
      console.log('commentData: ', comment);
      console.log(oComment);
      this.a.hideLoader();
    }, e => {
      this.a.showError(e);
      this.a.hideLoader();
    });
  }

  onClickLike(choice: 'like' | 'dislike') {

    this.likeLoader = true;
    this.a.forum.commentLike(this.comment.comment_ID, choice)
      .subscribe(re => {
        this.likeLoader = false;
        console.log("like: ", re);
        this.comment.meta['like'] = re['like'];
        this.comment.meta['dislike'] = re['dislike'];
      }, e => {
        this.likeLoader = false;
        this.a.alert(e);
      });
  }

}

