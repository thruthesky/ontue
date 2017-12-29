import { Component, AfterViewInit } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.html'
})
export class PaymentPage implements AfterViewInit {


    paypal_ready = false;
    amount = 5000;
    tax = 7.4;

    php_error = null;
    payment_rate = {
        usd_exchange_rate: 0,
        paypal_student_fee: 0
    };
    constructor(
        public a: AppService
    ) {
        a.lms.payment_rate().subscribe( re => {
            console.log(re);
            this.payment_rate = re;
         } );
    }


    ionViewDidLoad() {
    }


    get errorOnExchangeRate () {

        const r = this.a.toInt( this.payment_rate.usd_exchange_rate );
        
        // console.log(r);
        if ( r && r < 1000 ) {
            return true;
        }
        else return false;

    }

    ngAfterViewInit() {
        setTimeout(() => this.initPaypal(), 200);
    }

    initPaypal() {
        let paypal = window['paypal'];
        if (!paypal) this.a.alert("Paypal initialization has failed.");


        let CREATE_PAYMENT_URL = window['url_backend'] + '/wp-content/plugins/xapi-2/lms/paypal-create-payment.php';
        let EXECUTE_PAYMENT_URL = window['url_backend'] + '/wp-content/plugins/xapi-2/lms/paypal-execute-payment.php';
        console.log("create payment url: ", CREATE_PAYMENT_URL);
        console.log("execute payment url: ", EXECUTE_PAYMENT_URL);
        paypal.Button.render({
            env: 'production', // sandbox | production
            commit: true, // Show a 'Pay Now' button
            style: {
                color: 'gold',
                size: 'small'
            },
            payment: () => {
                console.log("amont: ", this.amount);
                console.log("debug url: ", CREATE_PAYMENT_URL + '?amount=' + this.amount + '&session_id=' + this.a.user.sessionId );
                return paypal.request.post(CREATE_PAYMENT_URL, { amount: this.amount, session_id: this.a.user.sessionId })
                    .then((res) => {
                        // console.log("Response from php: ", res);
                        if (res['code']) { // error.
                            // alert(res['message']); // alert() is not working
                            console.log("ERROR from create-payment.php", res);
                            this.php_error = res['message'];
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
                else if (this.php_error) alert(this.php_error);
                else alert('앗, 결제 중에 에러가 발생하였습니다. An error occurred during the transaction');
            }
        }, '#paypal-button')
            .then(() => {
                this.paypal_ready = true;
                console.log("Paypal icon rendered.")
            });
    }

    amount_in_usd_with_tax() {
        const exchange = this.a.toFloat( this.payment_rate.usd_exchange_rate );
        if ( ! exchange ) return;
        const kwr = this.a.toInt( this.amount );
        const usd = kwr / exchange;

        const usd_with_tax = usd + usd * this.payment_rate.paypal_student_fee / 100;
        // return usd_with_tax.toFixed(2);

        return Math.round( usd_with_tax * 100 ) / 100;



        

        // return a + a * u / 100;

        //  + this.amount * this.payment_rate.usd_exchange_rate / 100;
        // 총 결제 금액: {{ a.toInt(amount) + amount * tax / 100 | number }} 원 결제 금액({{ amount
        //     | number }}) + 세금( {{ amount * tax / 100 | number }} )
    }
    

}