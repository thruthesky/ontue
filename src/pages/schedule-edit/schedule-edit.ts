import { Component } from '@angular/core';
import {AlertController, ModalController} from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { AddSchedule } from './../../components/add-schedule/add-schedule';
import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'schedule-edit-page',
  templateUrl: 'schedule-edit.html'
})
export class ScheduleEditPage {

  timezone_offset = 0;
  timezone_name = 0;
  time = '';
  timer = 0;

  data = null;
  schedules: SCHEDULE_EDIT_RESPONSE;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public a: AppService
  ) {

    if (a.user.isLogin && a.isTeacher) {
      this.a.lms.timezone().subscribe( re => {
        this.timezone_name = re['name'];
        this.timezone_offset = parseInt(re['offset']);
      }, () => {} );
      this.updateTime();

      this.getMySchedule();
    }
    else {
      a.open('home');
      a.alert("User type must be teacher and should login first...");
    }




  }

  updateTime() {
    if ( this.timezone_name ) {
      // console.log('this. timezone ', this.timezone_offset)
      this.time = this.a.lms.localeString( this.timezone_offset );
      // console.log( this.time );
    }
    this.timer = setTimeout( () => this.updateTime(), 1000 );
  }


  onClickAddSchedule() {
    const idx = this.checkEmptySchedule();
    if ( idx ) {
      const msg = `Schedule No. ${idx} has no days. You need to delete it before you are going to add or edit a schedule.`;
      // this.a.alert(msg);
      this.a.okDialog('Warning: Delete Empty Schedule!', msg, () => {
        // this.getMySchedule();
      });
      // alert(msg);
      return;
    }
    const modal = this.modalCtrl.create( AddSchedule,
      { php_to_kwr: this.data['php_to_kwr'],
        usd_to_kwr: this.data['usd_to_kwr'],
        share_teacher: this.data['share_teacher'],
        transaction_fee: this.data['transaction_fee'],
        max_point_per_minute: this.data['max_point_per_minute']
      }, {cssClass:'add-schedule'} );
    modal.onDidDismiss(()=> {
      this.getMySchedule();
    });
    modal.present();
  }

  onClickEditSchedule(schedule) {
    const modal = this.modalCtrl.create( AddSchedule, {
      schedule: schedule,
      php_to_kwr: this.data['php_to_kwr'],
      usd_to_kwr: this.data['usd_to_kwr'],
      share_teacher: this.data['share_teacher'],
      max_point_per_minute: this.data['max_point_per_minute']
    }, {cssClass:'add-schedule'});
    modal.onDidDismiss(()=> {
      this.getMySchedule();
    });
    modal.present();
  }


  checkEmptySchedule() {
    if ( this.data && this.data.schedules && this.data.schedules.length ) {
      for( let s of this.data.schedules ) {
        if ( !s.sunday && !s.monday && !s.tuesday && !s.wednesday && !s.thursday && !s.friday && !s.saturday ) {
          return s.idx;
        }
      }
    }
    return false;
  }
  getMySchedule(){
    this.a.lms.my_schedules().subscribe( re =>{
      // console.log('getMySchedule', re);
      this.data = re;

      // this.onClickAddSchedule(); // TEST ONLY
    } , e => this.a.alert(e) );
  }

  onClickDelete(idx){
    if (this.a.user.isLogin) {
      let confirm = this.alertCtrl.create({
        title: this.a.i18n["DELETE SCHEDULE"],
        message: this.a.i18n["CONFIRM DELETE"],
        buttons: [
          {
            text: this.a.i18n["YES"],
            handler: () => {
              // console.log('Yes');
              this.a.showLoader();
              this.a.lms.schedule_delete(idx).subscribe(res => {
                // console.log('success delete: ', res);
                this.getMySchedule();
                this.a.hideLoader();
              }, e => {
                this.a.showError(e);
                this.a.hideLoader();
              });
            }
          },
          {
            text: this.a.i18n["CANCEL"],
            handler: () => {
              // console.log('cancel');
            }
          }
        ]
      });
      confirm.present();
    }
  }

}
