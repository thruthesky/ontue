import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {NavParams} from "ionic-angular";
// import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-schedule',
  templateUrl: 'schedule-table.html'
})
export class ScheduleTablePage {


  params;

  // schedules: SCHEDULE_EDIT_RESPONSE;
  // table;
  re = {
    starting_day: '',
    header: [],
    schedule: [],
    table: []
  };

  /// search options
  days = 5;
  min_duration = 10;
  max_duration = 0;


  sunday;
  monday;
  tuesday;
  wednesday;
  thursday;
  friday;
  saturday;

  min_point = 0;
  max_point = 0;



  constructor(
    public a: AppService,
    public navParams: NavParams,
  ) {


    this.params = navParams.data;

    console.log('data params', this.params);

    // this.getTeacherSchedule(this.params.ID);

    this.loadScheduleTable( this.request() );
  }


  request( options = {} ) {
    let defaults = {
      teachers: [],
      days: this.days,
      min_duration: this.min_duration,
      max_duration: this.max_duration,
      limit: 1000,
      navigate: '',
      starting_day: this.re.starting_day,
      sunday: this.sunday ? 'Y' : '',
      monday: this.monday ? 'Y'  : '',
      tuesday: this.tuesday ? 'Y' : '',
      wednesday: this.wednesday ? 'Y' : '',
      thursday: this.thursday ? 'Y' : '',
      friday: this.friday ? 'Y' : '',
      saturday: this.saturday ? 'Y' : '',
      min_point: this.min_point,
      max_point: this.max_point
    };
    
    const req = Object.assign( defaults, options );
    console.log("Request: ", req );
    return req;
  }
  // getTeacherSchedule( ID ) {

  //   this.a.lms.schedule_search( [ ID ] ).subscribe( re => {
  //     console.log( re );
  //     this.schedules = re;
  //   });

  // }


  loadScheduleTable( options ) {
    this.a.lms.schedule_table( options ).subscribe( re => this.displayScheduleTable(re), e => this.a.alert(e));
  }

  displayScheduleTable(re) {

    console.log(re);
    this.re = re;

  }
  displaySession() {

  }


  schedule( idx_schedule ) {
    return this.re.schedule[ idx_schedule ];
  }

  onChangeSearchOption() {


    this.loadScheduleTable( this.request() );
  }


  onClickNavigate( navigate ) {
    this.loadScheduleTable( this.request( { navigate: navigate } ) );
  }

  onClickReserve( session ) {
    session.in_progress = true;
    this.a.lms.class_reserve({ idx_schedule: session.idx_schedule, date: session.date }).subscribe( re => {
      console.log("class_reserve: ", re);
      session.in_progress = false;
      session.session = 'R';
    }, e => {
      session.in_progress = false;
      this.a.alert(e);
    });

  }
}
