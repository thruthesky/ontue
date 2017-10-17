import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {AppService} from '../../providers/app.service';
import {FILES, POST_CREATE, POST_CREATE_RESPONSE} from "../../angular-xapi/interfaces";
import {SitePreview} from "../../angular-xapi/site-preview";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'post-create-edit',
  templateUrl: 'post-create-edit.html'
})
export class PostCreateEditPage {

  method;
  params;
  post_title;
  post_content;


  private typing = new Subject<string>();
  private subscriptionTyping = null;
  longthenContent = false;
  preview: SitePreview;

  files: FILES = [];


  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ){
    this.params = navParams.data;
    this.method = this.params['method'];


    this.preview = new SitePreview(a.forum).listen();
    this.preview.done.subscribe(preview => {

      console.log('preview:: ', this.preview);
      /// @see logic of auto titling https://docs.google.com/document/d/1m3-wYZOaZQGbAzXeVlIpJNSdTIt3HCUiIt9UTmZUgXo/edit#heading=h.qlbi1doi8u3z
      if (!this.post_title) {
        console.log('this.post_title::');
        this.post_title = preview.title;
        this.unsubscribeTyping();
        this.a.xapi.render();
      }
    });



    if(this.method == 'create') {
      console.log('Create Post');
      /**
       * Once you type(keyup) on title box, no more title change.
       * Until then, if you type on content box, title will be changed also.
       */
      this.subscriptionTyping = this.typing
        .debounceTime(300)
        .subscribe(text => {
          this.post_title = this.a.forum.getTitleOnTextBegin(text);
          console.log('post_title: ', this.post_title);
        });
    } else if(this.method == 'edit') {
        this.post_title = this.params['post'].post_title;
        this.post_content = this.params['post'].post_content;
        this.preview.result = this.params['post'].site_preview;
    }
  }


  onClickSubmit() {
    let data: POST_CREATE = {
      category: this.params['category'],
      post_title: this.post_title,
      post_content: this.post_content,
      site_preview_id: this.preview.id
    };

    data.fid = this.files.reduce((_, file) => { _.push(file.id); return _; }, []);
    console.log(data);
    this.a.forum.postCreate(data).subscribe((ID: POST_CREATE_RESPONSE) => {
      console.log(ID);
      this.viewCtrl.dismiss(ID);
    }, err => {
      console.log('onClickSubmit::error::',err);
      this.a.showError(err);
    });
  }

  onClickCancel() {
    this.viewCtrl.dismiss();
  }


  contentInput(text: string): void {
      console.log('contentInput', text);
    this.preview.typing.next(text);
    if ( this.method == 'create' ) this.typing.next(text);
    if ( text.length > 100 ) this.longthenContent = true;
    else this.longthenContent = false;
  }

  /**
   * If there is any key up on title(even arrow key), No more subscribing on keyboard input.
   */
  titleInput() {
    this.unsubscribeTyping();
  }

  unsubscribeTyping() {
    if (this.subscriptionTyping) this.subscriptionTyping.unsubscribe();
  }


}
