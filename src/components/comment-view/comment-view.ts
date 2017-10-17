import { Component, Input } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {
  POST, FILES,
  COMMENT
} from './../../angular-xapi/interfaces';
import { AlertController } from "ionic-angular";


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
  constructor(
    public a: AppService,
    public alertCtrl: AlertController
  ) {

  }

  onCreate(comment_ID) {
    this.showReply = false;
  }

  onClickEdit() {
    // this.commentEditModal.open(this.post, this.comment).then(id => {
    //   // console.log('comment edit success:', id);
    //
    // }, err => this.a.showError(err))
    //   .catch( e => this.a.showError(e) );
  }

  onClickDelete() {

    if(this.a.user.isLogin){

      let confirm = this.alertCtrl.create({
        title: 'Delete Comment',
        message: 'Are you sure you cant to delete?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes');
              this.a.forum.commentDelete(this.comment.comment_ID).subscribe(res => {
                        console.log('success delete: ', res);
                        if ( res.mode == 'mark' ) {
                          this.updateComment( this.comment );
                        }
                        else {
                          let index = this.post.comments.findIndex( comment => comment.comment_ID == res.comment_ID );
                          this.post.comments.splice( index, 1 );
                        }
                      }, e => this.a.showError(e));
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

  updateComment( oComment: COMMENT ) {
    this.a.forum.commentData(oComment.comment_ID).subscribe((comment: COMMENT) => {
      let depth = oComment.depth;
      Object.assign( oComment, comment );
      oComment.depth = depth;
      console.log('commentData: ', comment);
      console.log( oComment );
    }, e => this.a.showError(e));
  }

  onClickLike( choice: 'like' | 'dislike' ) {
    
    this.likeLoader = true;
    this.a.forum.commentLike( this.comment.comment_ID, choice )
      .subscribe( re => {
        this.likeLoader = false;
        console.log("like: ", re);
        this.comment.meta['like'] = re['like'];
        this.comment.meta['dislike'] = re['dislike'];
      }, e => {
        this.likeLoader = false;
        this.a.alert(e);
      });
  }


  //
  // onClickUserProfile(event: MouseEvent) {
  //   if ( event ) event.stopPropagation();
  //   this.profileDropdown.open();
  // }


  // onMouseEnterUserProfile(event: MouseEvent) {
  //   this.mouse = 'in';
  //   setTimeout(() => {
  //     if ( this.mouse == 'in' ) this.profileDropdown.open();
  //   }, this.timeout );
  // }
  //
  // onMouseLeaveUserProfileMenu() {
  //   this.mouse = 'out';
  //   setTimeout( () => {
  //     if ( this.mouse == 'out' ) this.profileDropdown.close();
  //   }, this.closingTimeout);
  // }
  //

}

