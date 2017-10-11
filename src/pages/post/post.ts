import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

    post_id = null;
    
  constructor(
      public navParams: NavParams
  ) {

    this.post_id = navParams.get('post_id');
    

  }

}
