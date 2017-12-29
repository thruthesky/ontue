import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from './../../providers/app.service';
import { NavParams } from "ionic-angular";
import { Subject } from "rxjs/Subject";

import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";

// import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-schedule',
  templateUrl: 'schedule-table.html'
})
export class ScheduleTablePage {


  @ViewChild('content') content;

  display_options = false;
  params;

  // schedules: SCHEDULE_EDIT_RESPONSE;
  // table;
  // re = {
  //   starting_day: '',
  //   header: [],
  //   schedule: {},
  //   table: [],
  //   teacher: { age: 0, gender: '', name: '', idx: 0, photoURL: '', grade: 0 }
  // };


  starting_day = '';
  header = [];
  schedules = {}; // whole schedules
  schedule_table_rows = []; // whole table rows;
  student = {};
  ___teacher = { age: 0, gender: '', name: '', idx: 0, photoURL: '', grade: 0 };

  



  /// search options
  days = 0; // 7 for mobile and single teacher. 6 for mobile and multiple teachers. 20 for web.
  min_duration = 0;
  max_duration = 160;



  displayWeekends = true;

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
  urlYoutube = null;

  no_of_schedules = 0;
  no_of_schedule_limit = 0;

  // page_no = 1;
  navigate = 'today';

  hours = Array(24).fill(0).map( (e, i) => i );
  class_begin_hour = 0;
  class_end_hour = 1;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    public youtube: YoutubeVideoPlayer
  ) {


    this.params = navParams.data;
    this.singleTeacher = this.params.ID;

    if (this.singleTeacher) this.days = 7;
    else this.days = 6;

    console.log('data params', this.params);


    this.loadScheduleTable();
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


  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    // this.cdr.detach();
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
      // limit: 10000, // Leave default to backend.
      navigate: 'today',
      starting_day: this.starting_day,
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


  loadScheduleTable( callback? ) {
    let opt = {};
    if (this.params.ID) opt['teachers'] = [this.params.ID];
    opt = this.request( opt );
    this.a.lms.schedule_table(opt).subscribe(re => {
      this.displayScheduleTable(re);
      if ( callback ) callback();
      if (Object.keys(re['schedule']).length == 0) {
        this.a.alert('선생님의 수업 시간표가 없습니다.');
      }
    }, e => this.a.alert(e));
  }

  displayScheduleTable(re) {
    console.log('got data: ', re);
    /// 시간표 속도 : https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.xxaqipe33arp
    this.no_of_schedules = re.no_of_schedules;
    this.no_of_schedule_limit = re.no_of_schedule_limit;

    this.starting_day = re.starting_day;

    this.header = re.header;
    this.schedules = re.schedule; // whole schedules
    this.student = re.student;
    this.___teacher = re.teacher;


    setTimeout(() => {
      this.schedule_table_rows = re.table;
      console.log(this.schedule_table_rows);
      // this.re = re;
    }, 100);

    this.delayPush( re.table );

  }
  
  delayPush( table ) {
    setTimeout( () => {
      this.schedule_table_rows.push( table.shift() );
      this.schedule_table_rows.push( table.shift() );
      this.schedule_table_rows.push( table.shift() );
      this.delayPush( table );
    }, 1000 );
  }

  schedule(idx_schedule) {
    if ( this.schedules && this.schedules[idx_schedule] ) return this.schedules[idx_schedule];
    else return null;
  }

  first_schedule() {
    const keys = Object.keys(this.schedules);
    return this.schedules[keys[0]];
  }

  updateTime() {
    if (this.student && this.student['timezone']) {
      // this.time = this.a.lms.localeString(this.re['student']['timezone']);
      let date = this.a.lms.userDate(this.student['timezone']);
      let hour = date.getHours();
      let ap = '';
      if ( hour < 12 ) ap = '오전';
      else ap = '오후';
      if ( hour != 12 ) hour = hour % 12;
    

      this.time = date.getDate() + '일 ' + ap + ' ' + hour + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초';
    }
    this.timer = setTimeout(() => this.updateTime(), 1000);
  }


  /**
   * Returns teacher information
   * @param session session of the reservation table
   */
  teacher( session = null ) {
    if ( session == null ) return null;
    if ( ! this.schedules ) return null;
    if ( this.schedules[session.idx_schedule] ) return this.schedules[session.idx_schedule]['teacher'];
    else return null;
  }

  /**
   * Returns teacher name after sanitizing ( shorten )
   * @param session a session
   */
  teacher_name(session = null) {
    let name = 'NoName';
    // console.log(session);
    const teacher = this.teacher( session );
    // console.log('teacher: ', teacher);
    if ( teacher ) name = teacher.name;
    else name = this.___teacher['name'];
    return this.a.preTeacherName( name );
  }

  /**
   * 
   * @param session 
   */
  teacher_photoURL(session = null) {
    // console.log("session: ", session);
    const teacher = this.teacher( session );
    if ( teacher ) return teacher.photoURL;
    else return this.___teacher.photoURL;
  }
  teacher_ID(session = null) {
    const teacher = this.teacher( session );
    if ( teacher ) return teacher.idx;
    else return this.___teacher.idx;
  }

  teacher_age() {
    return this.___teacher.age;
  }
  teacher_grade() {
    return this.___teacher.grade;
  }
  teacher_gender() {
    let g = this.___teacher.gender;
    if (g == 'M') return '남';
    else return '여';
  }

  session_time(session) {
    // console.log("session: ", session);
    const schedule = this.schedule(session.idx_schedule);
    if ( ! schedule ) return 0;
    const begin = schedule.user_time_class_begin;
    const hour = begin.substr(0, 2);
    const minute = begin.substr(2, 2);
    return hour + ':' + minute;
  }

  onChangeSearchOption() {
    this.loadScheduleTable();
  }

  onChangeValue() {
    this.typing.next();
  }


  onClickNavigate(navigate) {
    this.navigate = navigate;
    this.loadScheduleTable();
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
    this.a.lms.session_reserve({ idx_schedule: session.idx_schedule, date: session.date }).subscribe(re => {
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
      this.a.loadMyPoint(p => {
        this.my_point = p;
        // this.cdr.detectChanges();
      });
      
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

  onClickFabOptions() {
    this.display_options = true;
    this.content.scrollTo(0,0);
  }

  // playYoutube() {
  //   let youtubeID = this.a.getYoutubeID( this.re.teacher['youtube_video_url'] );
  // }
  playTeacherYoutube() {
    const ID =  this.a.getYoutubeID( this.___teacher['youtube_video_url'] );
    if ( ! ID ) return this.a.alert('본 강사는 유튜브 동영상을 등록하지 않았습니다.');
    if ( this.a.isCordova ) {
      this.youtube.openVideo( ID );
    }
    else {
      this.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl( this.a.getYoutubeUrl( ID ));
    }

  }

  // doInfinite(infiniteScroll) {
  //   this.page_no ++;
  //   console.log('Begin async operation');
  //   this.loadScheduleTable( () => {
  //     infiniteScroll.complete();
  //   });
  // }


}
