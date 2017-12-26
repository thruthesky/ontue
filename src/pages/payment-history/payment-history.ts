import { Component } from '@angular/core';
import {AppService} from '../../providers/app.service';
import {ModalController} from "ionic-angular";
import {PaymentReceipt} from "../../components/payment-receipt/payment-receipt";


@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html'
})
export class PaymentHistoryPage {

  payments = [];

  constructor(
    public a: AppService,
    public modalCtrl: ModalController,
  ) {
    this.a.lms.get_payment_history().subscribe( res => {
      console.log("get_payment_history", res['payments']);
      this.payments = res['payments'];
      this.onClickPrintPreview(this.payments[0]);
    }, e => {
      this.a.alert(e);
    });

  }

  onClickPrintPreview(payment) {
    console.log("payment:: ", payment);
    const modal = this.modalCtrl.create(PaymentReceipt,
      {payment: payment});
    modal.onDidDismiss(() => {
    });
    modal.present();
  }

  onClickPrint() {
    window.print();
  }


}
