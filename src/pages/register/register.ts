import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { USER_REGISTER } from './../../angular-xapi/interfaces';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    account = <USER_REGISTER>{};
    constructor(
        public navCtrl: NavController,
        public a: AppService
    ) {

    }

    ngAfterViewInit() { // TEST

    }


    onSubmit() {
        this.a.showLoader();
        this.account.user_login = this.account.user_email;
        this.a.user.register( this.account ).subscribe(re => {
            console.log("user.register => success: re: ", re);
            this.a.open('home');
        }, reg => {
            this.a.hideLoader();
            alert(reg.message);
        });

    }

}

