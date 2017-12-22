import {Component} from '@angular/core';
import {AppService} from '../../providers/app.service';
import {NavParams,ViewController} from 'ionic-angular';

@Component({
  selector: 'payment-receipt',
  templateUrl: 'payment-receipt.html'
})
export class PaymentReceipt {

  data;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {

    this.data = navParams.data;
    console.log( this.data );

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  toInt(n:any){
    if( typeof n == 'string' ) {
      return parseInt( n );
    }
    else if( typeof n == 'number' ){
      return n;
    }
    else {
      return 0;
    }
  }


  onClickPrint(){
    window.print();
  }



}
