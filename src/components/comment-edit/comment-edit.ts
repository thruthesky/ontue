import {Component} from '@angular/core';

import { AppService } from './../../providers/app.service';
import {
  FILES, COMMENT, POST, COMMENT_UPDATE
} from './../../angular-xapi/interfaces';

import { SitePreview } from '../../angular-xapi/site-preview';
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'comment-edit',
  templateUrl: 'comment-edit.html'
})
export class CommentEditPage {

  comment_content;
  params;

  // original post, comment
  post: POST;
  comment: COMMENT;
  files: FILES = [];
  preview: SitePreview;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.preview = new SitePreview( a.forum ).listen();
    this.params = navParams.data;
    this.post = this.params['post'];
    this.comment = this.params['comment'];

    this.comment_content = this.comment.comment_content;
    this.files = Array.from(this.comment.files);
    this.preview.result = this.comment.site_preview;


  }

  onClickSubmit() {
    this.a.showLoader();
    let req: COMMENT_UPDATE = {
      comment_ID: this.comment.comment_ID,
      comment_content: this.comment_content,
      site_preview_id: this.preview.id
    };
    req.fid = this.files.reduce((_, file) => { _.push(file.id); return _; }, []);

    // console.log('onClickSubmit:',req);
    this.a.forum.commentUpdate(req).subscribe(id => {
      this.a.hideLoader();
      this.viewCtrl.dismiss(this.comment);
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }


}
