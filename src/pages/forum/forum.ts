import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html'
})
export class ForumPage {

  constructor(
    public a: AppService
  ) {

  }

}




