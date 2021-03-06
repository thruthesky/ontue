import {
  Component, Input, ViewChild
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';

import { AppService } from '../../providers/app.service';


import {
  POST, FILES,
  COMMENT, COMMENT_CREATE, COMMENT_CREATE_RESPONSE,
} from '../../angular-xapi/interfaces';

import { FileUploadWidget } from '../../components/file-upload/file-upload';

import { SitePreview } from '../../angular-xapi/site-preview';


@Component({
  selector: 'comment-create-widget',
  templateUrl: 'comment-create.html'
})

export class CommentCreateWidget {

  @Input() post: POST;
  @Input() comment: COMMENT;
  @ViewChild('fileUploadWidget') fileUploadComponent: FileUploadWidget;
  files: FILES = [];
  comment_content: string;


  preview: SitePreview;

  constructor(
    public a: AppService
  ) {
    this.preview = new SitePreview( a.forum );
    this.preview.listen();
  }

  onSubmit() {

    this.a.showLoader();
    console.log(this.comment_content);
    let req: COMMENT_CREATE = {
      comment_post_ID: this.post.ID,
      comment_content: this.comment_content,
      site_preview_id: this.preview.id
    };

    req.fid = this.files.reduce((_, file) => { _.push(file.id); return _; }, []);

    if (this.comment && this.comment.comment_ID) req.comment_parent = this.comment.comment_ID;
    this.a.forum.commentCreate(req).subscribe((re: COMMENT_CREATE_RESPONSE) => {
      console.log("COMMENT CREATE RE: ", re);
      let id = re.comment_ID;
      console.log("comment created", re);
      this.insertComment(id);
      this.resetForm();
      this.a.hideLoader();
    }, err => {
      this.a.showError(err);
      this.a.hideLoader();
    });



  }

  resetForm() {
    this.files = [];
    this.comment_content = '';
    this.preview.result = null;
  }

  insertComment(comment_ID) {
    this.a.showLoader();
    this.a.forum.commentData(comment_ID).subscribe((comment: COMMENT) => {
      console.log(comment);
      if (!this.post.comments) this.post['comments'] = [];

      if (comment.comment_parent == 0) {
        this.post.comments.unshift(comment);
      }
      else {
        let index = this.post.comments.findIndex(c => c.comment_ID == comment.comment_parent);
        if (index == -1) {
          // error. Maybe parent comment has been completely deleted by admin while a reply of that comment.
          this.post.comments.unshift(comment);
        }
        else {
          comment['depth'] = this.post.comments[index].depth + 1;
          this.post.comments.splice(index + 1, 0, comment);
        }
      }
      this.a.hideLoader();
    }, e => {
      this.a.showError(e);
      this.a.hideLoader();
    });
  }



}
