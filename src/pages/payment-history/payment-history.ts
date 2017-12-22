import { Component } from '@angular/core';
import {AppService} from '../../providers/app.service';


@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html'
})
export class PaymentHistoryPage {

  payments = [];

  constructor(
    public a: AppService
  ) {
    this.a.lms.get_payment_history().subscribe( res => {
      console.log("get_payment_history", res);
    }, e => {
      this.a.alert(e);
    });

  }

}
