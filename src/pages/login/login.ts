import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { USER_LOGIN } from './../../angular-xapi/services/defines';



@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    
    account = <USER_LOGIN>{};
    constructor(
        public navCtrl: NavController,
        public a: AppService
    ) {

    }

    ngAfterViewInit() { // TEST

    }


    onSubmit() {
        this.a.showLoader();
        this.a.user.login( this.account.user_email, this.account.user_pass ).subscribe(re => {
            // this.loading = false;
            console.log("user.login => success: re: ", re);
            this.navCtrl.pop();
        }, reg => {
            // this.loading = false;
            this.a.hideLoaader();
            alert(reg.message);
        });
    }


}

