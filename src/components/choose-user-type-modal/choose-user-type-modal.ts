import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'choose-user-type-modal',
    templateUrl: 'choose-user-type-modal.html'
})

export class ChooseUserTypeModal {
    constructor(
        public a: AppService,
        public viewCtrl: ViewController
    ) {

    }


    onClickUserType(type) { // User select user type.
        console.log("type: ", type);
        this.a.showLoader();
        this.a.lms.setUserType(type).subscribe(re => { // update on server
            this.a.user.loadProfile() // reload user profile.
                .subscribe(
                re => {
                    this.dismiss();
                    this.a.hideLoaader();
                },
                e => this.a.alert(e)
                );
        }, e => this.a.alert(e));

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }




}


