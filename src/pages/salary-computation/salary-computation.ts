import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams } from 'ionic-angular';


export interface PAYMENT_COMPUTATION_INFORMATION {
  buyer_rate: number;
  gcash_transaction: number;
  teacher_share: number;
  transaction_fee: number;
  php: string;
  usd: string;
  WU: {any}
}

@Component({
  selector: 'salary-computation-page',
  templateUrl: 'salary-computation.html'
})

export class SalaryComputationPage implements OnInit {
  loading = false;
  payment_information = {
    payment_method: 'paypal'
  };
  payment_computation: PAYMENT_COMPUTATION_INFORMATION = <PAYMENT_COMPUTATION_INFORMATION>{
    teacher_share: 0,
    WU: {}
  };


  total_points = 0;
  teacher_share = 0;
  paypal_charges = 0;
  buying_rate = 0;
  earnings = 0;
  salary = '0';
  gcash_transaction_fee = 0;

  constructor(public a: AppService,
              navParams: NavParams,) {
    if (navParams.data['total_points']) {
      this.total_points = navParams.data['total_points'];
    }


    this.a.lms.get_payment_computation_info().subscribe(re => {
      console.log('get_payment_computation_info', re);
      this.payment_computation = re;
      this.recompute();
    }, e => {
      this.a.alert(e);
    })
  }

  ngOnInit() {
  }

  recompute() {
    this.teacher_share = this.total_points * this.payment_computation.teacher_share / 100;
    this.paypal_charges = this.teacher_share * this.payment_computation.transaction_fee / 100;
    if ( this.payment_information['payment_method'] !== 'paypal' ) {
      console.log('this.payment_information[payment_method]', this.payment_information['payment_method']);
      this.buying_rate = this.teacher_share * this.payment_computation.buyer_rate / 100;
      this.earnings = Math.round(this.teacher_share - this.paypal_charges - this.buying_rate);
    } else {
      this.earnings = Math.round(this.teacher_share - this.paypal_charges);
    }

    if (this.payment_information['payment_method'] === 'paypal') {
      this.salary = Math.round(this.earnings / parseInt(this.payment_computation['usd'])) + 'USD';
    } else {

      // console.log('this.earnings',  this.earnings);
      // console.log('his.payment_computation[php]',  this.payment_computation['php']);
      let converted =  Math.round(this.earnings / parseFloat(this.payment_computation['php']));

      console.log('converted',  converted);
      this.salary = converted + 'PHP';
    }

  }
}
