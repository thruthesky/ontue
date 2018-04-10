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
  loadingRefundReject = false;

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
      title: this.a.i18n["ACCEPT REFUND"],
      message: this.a.i18n["CONFIRM ACCEPT REFUND"],
      buttons: [
        {
          text: this.a.i18n["YES"],
          handler: () => {
            this.a.lms.session_refund(book['idx']).subscribe(re => {
              // console.log(re);
              this.viewCtrl.dismiss('accept');
            }, e => this.a.alert(e));
          }
        },
        {
          text: this.a.i18n["CANCEL"],
          handler: () => {
            // console.log('Cancel');
          }
        }
      ]
    });
    confirm.present();


  }

  onClickRejectRefundRequest(book) {

    if(this.loadingRefundReject) return;
    const modal = this.modalCtrl.create(MessageWrite, {title: this.a.i18n["WHY REJECT REFUND"]});
    modal.onDidDismiss(msg => {
      if (msg) {

        this.loadingRefundReject = true;
        this.a.lms.session_refund_reject({
          idx_reservation: book['idx'],
          refund_reject_message: msg
        }).subscribe(res => {
          // console.log(res);
          this.viewCtrl.dismiss('reject');
          this.loadingRefundReject = false;
        }, e => {
          this.a.alert(e);
          this.loadingRefundReject = false;
        });
      }
    });
    modal.present();
  }

  onClickClose() {
    this.viewCtrl.dismiss();
  }
}
