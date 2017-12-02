import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.html'
})
export class PaymentPage {
    constructor(
        public a: AppService
    ) {

    }
}