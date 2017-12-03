import { Component, AfterViewInit, NgZone } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.html'
})
export class PaymentPage implements AfterViewInit {


    paypal_ready = false;
    amount = 5000;

    constructor(
        private ngZone: NgZone,
        public a: AppService
    ) {

    }


    ionViewDidLoad() {



    }


    ngAfterViewInit() {
        setTimeout(() => this.initPaypal(), 200);
    }

    initPaypal() {
        let paypal = window['paypal'];
        if (!paypal) this.a.alert("Paypal initialization has failed.");


        let CREATE_PAYMENT_URL = 'https://sonub.com:8443/wp-content/plugins/xapi-2/lms/paypal-create-payment.php';
        let EXECUTE_PAYMENT_URL = 'https://sonub.com:8443/wp-content/plugins/xapi-2/lms/paypal-execute-payment.php';
        paypal.Button.render({
            env: 'sandbox', // sandbox | production
            commit: true, // Show a 'Pay Now' button
            style: {
                color: 'gold',
                size: 'small'
            },
            payment: () => {
                console.log("amont: ", this.amount);
                return paypal.request.post(CREATE_PAYMENT_URL, { amount: this.amount, session_id: this.a.user.sessionId })
                    .then((res) => {
                        if (res['code']) { // error.
                            // alert(res['message']); // alert() is not working
                            console.log("ERROR from create-payment.php", res );
                            return 0;
                        }
                        else return res.paymentID;
                    });
            },
            onAuthorize: function (data, actions) {

                let execute_data = {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                };
                return paypal.request.post(EXECUTE_PAYMENT_URL, execute_data)
                    .then(function (res) {
                        console.log("result from paypal execute: ", res);
                        if (res['code']) alert('앗, 결제 실패하였습니다. ' + res['message']);
                        else alert('축하합니다! 결제에 성공하였습니다. Payment successful.');
                    });
            },
            onCancel: function (data, actions) {
                alert('결제를 취소하였습니다. You have cancelled the payment.');
            },
            onError: (err) => {
                if (this.a.user.isLogout) alert("앗, 로그인을 해 주세요. Please login");
                else alert('앗, 결제 중에 에러가 발생하였습니다. An error occurred during the transaction');
            }
        }, '#paypal-button')
            .then(() => {
                this.paypal_ready = true;
                console.log("Paypal icon rendered.")
            });
    }


}