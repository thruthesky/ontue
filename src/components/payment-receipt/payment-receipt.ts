import {Component} from '@angular/core';
import {AppService} from '../../providers/app.service';
import {NavParams,ViewController} from 'ionic-angular';

@Component({
    selector: 'payment-receipt',
    templateUrl: 'payment-receipt.html'
})
export class PaymentReceipt {
    payment;
    constructor(
        public a: AppService,
        public navParams: NavParams,
        public viewCtrl: ViewController,
    ) {

        this.payment = navParams.data['payment'];
        console.log( "PaymentReceipt", this.payment );

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    onClickPrint(){
        window.print();
    }



}
