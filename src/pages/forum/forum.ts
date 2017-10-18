import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html'
})
export class ForumPage {
  pageContent = '';
  constructor(
    public a: AppService
  ) {
    a.xapi.page({ name: 'ontue.forum-index' }).subscribe( re => this.pageContent = re, e => a.alert(e));

  }




}




