import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {AlertController, ModalController, NavParams, ViewController} from 'ionic-angular';
import {MessageWrite} from "../message-write/message-write";

@Component({
  selector: 'refund-request-view',
  templateUrl: 'refund-request-view.html'
})
export class RefundRequestView {


  book;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.book = navParams.data['book'];

  }

  onClickRefund(book) {
    let confirm = this.alertCtrl.create({
      title: 'Accept Refund',
      message: 'Are you sure you want to accept the request?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.a.lms.session_refund(book['idx']).subscribe(re => {
              console.log(re);
              this.viewCtrl.dismiss('accept');
            }, e => this.a.alert(e));
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    confirm.present();


  }

  onClickRejectRefundRequest(book) {
    const modal = this.modalCtrl.create(MessageWrite, {title: "Why Reject Refund?"});
    modal.onDidDismiss(re => {
      if (re) {
        this.a.lms.session_refund_reject({idx_reservation: book['idx'], refund_reject_message: re}).subscribe(res => {
          // console.log(res);
          this.viewCtrl.dismiss('reject');
        }, e => this.a.alert(e));
      }
    });
    modal.present();
  }

  onClickClose() {
    this.viewCtrl.dismiss();
  }
}
