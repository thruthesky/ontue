import { Component, AfterViewInit } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.html'
})
export class PaymentPage implements AfterViewInit {
    constructor(
        public a: AppService
    ) {

    }


    ionViewDidLoad() {



    }


    ngAfterViewInit() {
        setTimeout(() => this.initPaypal(), 2000);
    }
    initPaypal() {

        let paypal = window['paypal'];
        if (!paypal) this.a.alert("Paypal initialization has failed.");
        
        let CREATE_PAYMENT_URL  = 'https://sonub.com:8443/wp-content/plugins/xapi-2/lms/paypal-create-payment.php';
        let EXECUTE_PAYMENT_URL = 'https://sonub.com:8443/wp-content/plugins/xapi-2/lms/paypal-execute-payment.php';


        paypal.Button.render({
            env: 'sandbox', // sandbox | production


            commit: true, // Show a 'Pay Now' button
            style: {
                color: 'gold',
                size: 'small'
            },


            // payment() is called when the button is clicked
            payment: function () {

                // alert('payment');
                // Make a call to your server to set up the payment
                return paypal.request.post(CREATE_PAYMENT_URL)
                    .then(function (res) {
                        return res.paymentID;
                    });
            },



            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function (data, actions) {

                console.log('onAuthorize: data: ', data);
                // Set up the data you need to pass to your server
                let execute_data = {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                };

                // Make a call to your server to execute the payment
                return paypal.request.post(EXECUTE_PAYMENT_URL, execute_data)
                    .then(function (res) {
                        // window.alert('Payment Complete!');
                        console.log("result from paypal execute: ", res);

                        if ( res['code'] ) alert( '앗, 결제 실패하였습니다. ' + res['message'] );
                        else alert('결제에 성공하였습니다. Payment successful.');
                        
                    });
            },

            onCancel: function (data, actions) {
                /* 
                    * Buyer cancelled the payment 
                    */
                alert('결제를 취소하였습니다. You have cancelled the payment.');
            },
            onError: function (err) {
                /* 
                    * An error occurred during the transaction 
                    */
                    console.log("ERROR=======");
                    console.log(err);
                alert('An error occurred during the transaction');
            }

        }, '#paypal-button');

    }


}