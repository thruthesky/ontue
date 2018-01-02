import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'message-write',
  templateUrl: 'message-write.html'
})
export class MessageWrite {


  params;
  title:string = null;
  message: string = null;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = navParams.data;
    this.title = this.params['title'];
  }


  onClickSubmit() {
    if(!this.message){
      this.a.alert("Message cannot be empty...");
      return;
    }

    this.viewCtrl.dismiss(this.message)
  }


  onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
