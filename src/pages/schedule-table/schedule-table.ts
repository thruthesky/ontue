import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {NavParams} from "ionic-angular";
import {Subject} from "rxjs/Subject";
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
  days = 18;
  min_duration = 1;
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



  my_point = 0;
  showLoaderPointUpdate = false;


  point_range: { lower: number, upper: number } = { lower: 33, upper: 60 };

  private typing = new Subject<string>();

  constructor(
    public a: AppService,
    public navParams: NavParams,
  ) {


    this.params = navParams.data;

    console.log('data params', this.params);

    // this.getTeacherSchedule(this.params.ID);

    this.loadScheduleTable( this.request() );
    this.a.lms.my_point().subscribe( re => this.my_point = re['point'], e => this.a.alert( e ) );

    this.typing
      .debounceTime(300)
      .subscribe(() => {
        this.onChangeSearchOption();
      });
  }


  request( options = {} ) {
    let defaults = {
      teachers: [ ],
      days: this.days,
      min_duration: this.min_duration,
      max_duration: this.max_duration,
      limit: 1000,
      navigate: 'today',
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

  onChangeValue() {
    this.typing.next();
  }


  onClickNavigate( navigate ) {
    this.loadScheduleTable( this.request( { navigate: navigate } ) );
  }

  onClickSession( session ) {

    console.log('onClickSession', session);

    if ( session.status == 'open' ) this.reserveSession( session );
    else if ( session.status == 'reserved' && session.owner == 'me' ) this.cancelSession( session );

  }

  reserveSession( session ) {

    console.log("reserve: session: ", session);
    const schedule = this.schedule( session.idx_schedule );
    console.log("reserve: schedule: ", schedule);

    session.in_progress = true;
    this.a.lms.session_reserve({ idx_schedule: session.idx_schedule, date: session.date, class_begin: schedule.class_begin }).subscribe( re => {
      console.log("class_reserve: ", re);
      session.in_progress = false;
      session.status = 'reserved';
      session.owner = 'me';
      session.student_name = re.student_name;
      session.point = re.point;
      session.idx_reservation = re.idx_reservation;
      this.updatePoint();
    }, e => {
      session.in_progress = false;
      this.a.alert(e);
    });

  }

  cancelSession( session ) {

    session.in_progress = true;
    console.log("Going to cancel with : ", session.idx_reservation );
    this.a.lms.session_cancel( session.idx_reservation ).subscribe( re => {
      console.log("cancel success", re);
      session.in_progress = false;
      session.status = 'open';
      session.owner = '';
      session.student_name = '';
      session.point = this.schedule( session.idx_schedule ).point;
      this.updatePoint();
    }, e => {
      session.in_progress = false;
      this.a.alert(e);
    });
  }

  updatePoint() {
    this.showLoaderPointUpdate = true;
    this.a.lms.my_point().subscribe( re => {
      this.my_point = re['point'];
      this.showLoaderPointUpdate = false;
     }, e => this.a.alert(e) );
  }


  clearDaySelected(){
    this.sunday=this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=this.saturday=false;
    this.onChangeSearchOption();
  }

  selectMonToFri(){
    this.clearDaySelected();
    this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=true;
    this.onChangeSearchOption();
  }
  selectMWF(){
    this.clearDaySelected();
    this.monday=this.wednesday=this.friday=true;
    this.onChangeSearchOption();
  }
  selectTTh(){
    this.clearDaySelected();
    this.tuesday=this.thursday=true;
    this.onChangeSearchOption();
  }

  selectSunSat(){
    this.clearDaySelected();
    this.sunday=this.saturday=true;
    this.onChangeSearchOption();
  }
  selectAll(){
    this.sunday=this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=this.saturday=true;
    this.onChangeSearchOption();
  }

  onClickReserveVisible(sessions){

    console.log('onClickReserveVisible',sessions);


    sessions.forEach( session => {
      if(session.status == 'open'){
        // console.log(session)
        this.reserveSession( session);
      }

    });

  }

  onClickReserveCancel(sessions) {

    sessions.forEach( session => {
      if(session.status == 'reserved' && session.owner && session.owner == 'me'){
        // console.log(session)
        this.cancelSession( session);
      }

    });
  }

}
