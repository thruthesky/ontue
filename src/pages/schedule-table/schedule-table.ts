import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { NavParams } from "ionic-angular";
import { Subject } from "rxjs/Subject";
// import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-schedule',
  templateUrl: 'schedule-table.html'
})
export class ScheduleTablePage {


  display_options = false;
  params;

  // schedules: SCHEDULE_EDIT_RESPONSE;
  // table;
  re = {
    starting_day: '',
    header: [],
    schedule: {},
    table: [],
    teacher: { age: 0, gender: '', name: '', idx: 0, photoURL: '' }
  };

  /// search options
  days = 0; // 7 for mobile and single teacher. 6 for mobile and multiple teachers. 20 for web.
  min_duration = 0;
  max_duration = 160;



  displayWeekends = false;

  min_point = 0;
  max_point = 100000;




  my_point = 0;
  showLoaderPointUpdate = false;


  point_range: { lower: number, upper: number } = { lower: 33, upper: 60 };


  status = {
    future: "radio-button-off",
    past: "remove"
  };

  private typing = new Subject<string>();

  singleTeacher = null;
  time = null;
  timer = null;
  constructor(
    public a: AppService,
    public navParams: NavParams,
  ) {


    this.params = navParams.data;
    this.singleTeacher = this.params.ID;

    if (this.singleTeacher) this.days = 7;
    else this.days = 6;

    console.log('data params', this.params);


    let opt = {};
    if (this.params.ID) opt['teachers'] = [this.params.ID];
    this.loadScheduleTable(this.request(opt));
    // this.a.lms.my_point().subscribe( re => this.my_point = re['point'], e => this.a.alert( e ) );

    // this.a.loadMyPoint( p => this.my_point = p );

    this.updatePoint();

    this.typing
      .debounceTime(800)
      .subscribe(() => {
        this.onChangeSearchOption();
      });

    this.updateTime();
  }


  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }


  icon(session) {
    if (session['status'] == 'future') {
      if (session['open'] == 'open') { // open to reserve
        if (session['dayoff'] == 'dayoff') return 'cloud-circle'; // but day off
        else return 'radio-button-off'; // reservable
      }
      else if (session['open'] == 'reserved') { // already reserved.
        if (session['owner'] == 'me') {
          return 'radio-button-on';
        }
        else if (session['dayoff'] == 'dayoff') return 'cloud-done'; // already reserved and day-off
        else return 'checkmark'; // reserved
      }
      else if (session['open'] == 'no-schedule') { // teacher didn't open a session on this day of his schedule table.
        return 'qr-scanner'; // no schedule on this day.
      }
    }
    else { /// past classes.
      if (session['open'] == 'open') { // past class. but open.
        return 'square';
      }
      else { // past & reserved.
        if (session['dayoff'] == 'dayoff') return ''; // past class and dayoff.
        else return 'lock'; // past class and reserved.

      }
    }
  }
  session_text(session) {
    if (session['status'] == 'future') {
      if (session['open'] == 'reserved') {
        if (session['owner'] == 'me') {
          return '취소하기';
        }
      }
    }
  }

  request(options = {}) {
    let teachers = [];
    if (this.singleTeacher) teachers = [this.singleTeacher];

    let defaults = {
      teachers: teachers,
      days: this.days,
      min_duration: this.min_duration,
      max_duration: this.max_duration,
      limit: 1000,
      navigate: 'today',
      starting_day: this.re.starting_day,
      display_weekends: this.displayWeekends ? 'Y' : 'N',
      min_point: this.min_point,
      max_point: this.max_point
    };

    const req = Object.assign(defaults, options);
    console.log("Request: ", req);
    return req;
  }
  // getTeacherSchedule( ID ) {

  //   this.a.lms.schedule_search( [ ID ] ).subscribe( re => {
  //     console.log( re );
  //     this.schedules = re;
  //   });

  // }


  loadScheduleTable(options) {
    this.a.lms.schedule_table(options).subscribe(re => {
      this.displayScheduleTable(re);
      if (Object.keys(re['schedule']).length == 0) {
        this.a.alert('선생님의 수업 시간표가 없습니다.');
      }

    }, e => this.a.alert(e));
  }

  displayScheduleTable(re) {

    console.log(re);
    this.re = re;

  }
  displaySession() {

  }


  schedule(idx_schedule) {
    return this.re.schedule[idx_schedule];
  }

  first_schedule() {
    const keys = Object.keys(this.re.schedule);
    return this.re.schedule[keys[0]];
  }

  updateTime() {
    if (this.re && this.re['student'] && this.re['student']['timezone']) {
      this.time = this.a.lms.localeString(this.re['student']['timezone']);
    }
    this.timer = setTimeout(() => this.updateTime(), 1000);
  }

  /**
   * Returns teacher name after sanitizing ( shorten )
   * @param session a session
   */
  teacher_name(session = null) {
    if (session) {
      let name = this.schedule(session.idx_schedule).teacher.name;
      if (name.length > 8) name = name.substr(0, 8);
      return name;
    }
    else return this.re.teacher.name;
  }
  teacher_photoURL(session = null) {
    if (session) return this.schedule(session.idx_schedule).teacher.photoURL;
    else return this.re.teacher.photoURL;
  }
  teacher_ID(session = null) {
    if (session) return this.schedule(session.idx_schedule).teacher.idx;
    else return this.re.teacher.idx;
  }

  teacher_age() {
    return this.re.teacher.age;
  }
  teacher_gender() {
    let g = this.re.teacher.gender;
    if (g == 'M') return '남자';
    else return '여자';
  }

  session_time(session) {
    const begin = this.schedule(session.idx_schedule).user_time_class_begin;
    const hour = begin.substr(0, 2);
    const minute = begin.substr(2, 2);
    return hour + ':' + minute;
  }
  onChangeSearchOption() {
    this.loadScheduleTable(this.request());
  }

  onChangeValue() {
    this.typing.next();
  }


  onClickNavigate(navigate) {
    this.loadScheduleTable(this.request({ navigate: navigate }));
  }

  onClickSession(session) {

    console.log('onClickSession', session);
    if (session.status == 'past') return;

    if (session.open == 'open') this.reserveSession(session);
    else if (session.open == 'reserved' && session.owner == 'me') this.cancelSession(session);

  }

  reserveSession(session) {

    console.log("reserve: session: ", session);
    const schedule = this.schedule(session.idx_schedule);
    console.log("reserve: schedule: ", schedule);

    session.in_progress = true;
    this.a.lms.session_reserve({ idx_schedule: session.idx_schedule, date: session.date, class_begin: schedule.class_begin }).subscribe(re => {
      console.log("class_reserve: ", re);
      session.in_progress = false;
      session.open = 'reserved';
      session.dayoff = '';
      session.status = 'future';
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

  cancelSession(session) {

    session.in_progress = true;
    console.log("Going to cancel with : ", session.idx_reservation);
    this.a.lms.session_cancel(session.idx_reservation).subscribe(re => {
      console.log("cancel success", re);
      session.in_progress = false;
      session.status = 'future';
      session.open = 'open';
      session.owner = '';
      session.student_name = '';
      session.point = this.schedule(session.idx_schedule).point;
      this.updatePoint();
    }, e => {
      session.in_progress = false;
      this.a.alert(e);
    });
  }

  updatePoint() {

    if (this.a.user.isLogin) {
      this.a.loadMyPoint(p => this.my_point = p);
    }


  }




  onClickReserveVisible(sessions) {

    console.log('onClickReserveVisible', sessions);


    sessions.forEach(session => {
      if (session.open == 'open' && session.status != 'past') {
        // console.log(session)
        this.reserveSession(session);
      }

    });

  }

  onClickReserveCancel(sessions) {

    sessions.forEach(session => {
      if (session.open == 'reserved' && session.owner && session.owner == 'me') {
        // console.log(session)
        this.cancelSession(session);
      }

    });
  }

  onToggleDisplayWeekends($event) {
    console.log($event['checked']);

  }

}
