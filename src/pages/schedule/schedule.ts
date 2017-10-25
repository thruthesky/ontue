import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { AddSchedule } from './../../components/add-schedule/add-schedule';




@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  constructor(
    public modalCtrl: ModalController,
    public a: AppService
  ) {

    // setTimeout(() => this.onClickAddSchedule(), 500);



    a.lms.my_schedules().subscribe( re => console.log(re), e => a.alert(e) );
  }


  onClickAddSchedule() {
    const modal = this.modalCtrl.create( AddSchedule );
    modal.present();
  }
}
