import {Component, Input} from '@angular/core';
import {ViewController} from "ionic-angular";


@Component({
  selector: 'post-popover-widget',
  templateUrl: 'post-popover.html'
})
export class PostPopoverWidget {

  @Input() post;

  constructor(public viewCtrl: ViewController) {
  }

  onClickDismiss(method) {
    this.viewCtrl.dismiss(method);
  }

}
