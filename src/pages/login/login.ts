import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { USER_LOGIN } from './../../angular-xapi/interfaces';



@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {


    account = <USER_LOGIN>{};
    constructor(
        public a: AppService
    ) {

    }

    ngAfterViewInit() { // TEST

    }


    onSubmit() {
        this.a.showLoader();
        this.a.user.login( this.account.user_email, this.account.user_pass ).subscribe(re => {
            // this.loading = false;
            // console.log("user.login => success: re...: ", re);
            this.a.onUserLogin();
            this.a.open('home');
        }, e => {
            // this.loading = false;
            this.a.hideLoader();
            this.a.alert(e);
        });
    }


}

