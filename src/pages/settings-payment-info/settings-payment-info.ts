import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'settings-payment-info-page',
    templateUrl: 'settings-payment-info.html'
})
export class SettingsPaymentInfoPage {



    payment_information = {};
    payment_information_history = [];

    reload_history= false;

    constructor(public a: AppService) {
      if (a.user.isLogin && a.isTeacher) {
        this.loadPaymentInformation();
      }
      else {
        a.open('home');
        a.alert("User type must be teacher and should login first...");
      }
    }


    onClickSubmit() {
        this.a.lms.payment_information_update( this.payment_information ).subscribe( re => {
            // console.log(re);
            this.a.alert("Success");
            if( this.reload_history ) this.onClickShowHistory();
        }, e => this.a.alert(e) );
    }



    loadPaymentInformation() {
        this.a.lms.payment_information().subscribe( re => {
            // console.log(re);
            if ( re['payment_information']) this.payment_information = re['payment_information'];
        }, e => this.a.alert(e));
    }


    onClickShowHistory() {
      this.a.lms.payment_information_history().subscribe( res => {
        // console.log("payment history", res);
        this.payment_information_history = res['payment_history'];
        this.reload_history = true;
      }, e => {
        this.a.alert(e);
      });
    }

    onClickCompare() {

    }
}

