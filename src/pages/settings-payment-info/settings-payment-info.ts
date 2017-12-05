import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'settings-payment-info-page',
    templateUrl: 'settings-payment-info.html'
})
export class SettingsPaymentInfoPage {



    payment_information = {};


    constructor(public a: AppService) {
        this.loadPaymentInformation();
    }


    onClickSubmit() {

        this.a.lms.payment_information_update( this.payment_information ).subscribe( re => {
            console.log(re);
            this.a.alert("Success");
        }, e => this.a.alert(e) );
    }



    loadPaymentInformation() {
        this.a.lms.payment_information().subscribe( re => {
            console.log(re);
            if ( re['payment_information']) this.payment_information = re['payment_information'];
        }, e => this.a.alert(e));
    }
}

