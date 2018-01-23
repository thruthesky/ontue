import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AppService } from '../../providers/app.service';



@Component({
    selector: 'payment-result-page',
    templateUrl: 'payment-result.html'
})

export class PaymentResultPage implements OnInit {
    re;
    message;
    point = 0;
    constructor(
        public navParams: NavParams,
        public a: AppService
    ) {
        this.re = navParams.get('result');
        this.message = navParams.get('message');
        // this.a.lms.info().subscribe( re => {
        //     console.log('info. re: ', re);
        // }, e => a.alert(e) );

        this.a.loadMyPoint(p => this.point = p);
    }

    ngOnInit() { }
}