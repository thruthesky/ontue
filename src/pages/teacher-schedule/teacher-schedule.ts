import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {NavParams} from "ionic-angular";
import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-schedule',
  templateUrl: 'teacher-schedule.html'
})
export class TeacherSchedulePage {


  params;

  schedules: SCHEDULE_EDIT_RESPONSE;
  constructor(
    public a: AppService,
    public navParams: NavParams,
  ) {


    this.params = navParams.data;

    console.log('data params', this.params);

    this.getTeacherSchedule(this.params.ID);
  }

  getTeacherSchedule( ID ) {

    this.a.lms.schedule_search( [ ID ] ).subscribe( re => {
      console.log( re );
      this.schedules = re;
    });

  }



}
