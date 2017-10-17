import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'choose-user-type-modal',
    templateUrl: 'choose-user-type-modal.html'
})

export class ChooseUserTypeModal {

    newType = '';
    constructor(
        public a: AppService,
        public viewCtrl: ViewController
    ) {

    }


    onClickUserType(type) { // User select user type.
        console.log("type: ", type);
        this.newType = '';
        this.a.showLoader();
        this.a.lms.setUserType(type).subscribe(re => { // update on server
            this.a.user.loadProfile() // reload user profile.
                .subscribe( re => {
                    // this.dismiss();
                    console.log(re);
                    if ( re['user_type'] == 'T' ) this.newType = '선생';
                    else if ( re['user_type'] == 'S' ) this.newType = '학생';

                    this.a.hideLoader();
                },
                e => {
                    this.a.alert(e);
                    this.a.hideLoader();
                });
        }, e => {
            this.a.alert(e);
            this.a.hideLoader();
        });

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }




}


