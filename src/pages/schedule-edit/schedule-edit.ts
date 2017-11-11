import { Component } from '@angular/core';
import {AlertController, ModalController} from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { AddSchedule } from './../../components/add-schedule/add-schedule';
import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule-edit.html'
})
export class ScheduleEditPage {

  schedules: SCHEDULE_EDIT_RESPONSE;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public a: AppService
  ) {

    // setTimeout(() => this.onClickAddSchedule(), 500);



    this.getMySchedule();
  }


  onClickAddSchedule() {
    const modal = this.modalCtrl.create( AddSchedule );
    modal.onDidDismiss(()=> {
      this.getMySchedule();
    });
    modal.present();
  }

  onClickEditSchedule(schedule) {
    const modal = this.modalCtrl.create( AddSchedule, {schedule: schedule}  );
    modal.onDidDismiss(()=> {
      this.getMySchedule();
    });
    modal.present();
  }


  getMySchedule(){
    this.a.lms.my_schedules().subscribe( re =>{
      console.log('getMySchedule', re);
      this.schedules = re['schedules'];
    } , e => this.a.alert(e) );
  }

  onClickDelete(idx){
    if (this.a.user.isLogin) {
      let confirm = this.alertCtrl.create({
        title: 'Delete Schedule',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes');
              this.a.showLoader();
              this.a.lms.schedule_delete(idx).subscribe(res => {
                console.log('success delete: ', res);
                this.getMySchedule();
                this.a.hideLoader();
              }, e => {
                this.a.showError(e);
                this.a.hideLoader();
              });
            }
          },
          {
            text: 'cancel',
            handler: () => {
              console.log('cancel');
            }
          }
        ]
      });
      confirm.present();
    }
  }

}
