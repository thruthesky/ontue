import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { SCHEDULE_EDIT } from './../../angular-xapi/lms.service';

@Component({
    selector: 'add-schedule',
    templateUrl: 'add-schedule.html'
})

export class AddSchedule {

    data:SCHEDULE_EDIT = <SCHEDULE_EDIT> {};
    constructor(
        public a: AppService,
        public viewCtrl: ViewController
    ) {

    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    onSubmit() {
      this.a.showLoader();
        this.a.lms.schedule_edit( this.data ).subscribe( re => {
            console.log('re: ', re);
            this.a.hideLoader();
            if( re['idx']) {
              this.a.showAlert('Create Success', "New Schedule was created.");
              this.viewCtrl.dismiss();
            }
        }, e => {
          this.a.alert( e );
          this.a.hideLoader();
        })
    }



}


