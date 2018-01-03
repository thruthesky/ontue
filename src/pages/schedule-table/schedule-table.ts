import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from './../../providers/app.service';
import { NavParams } from "ionic-angular";
import { Subject } from "rxjs/Subject";

import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";

// import {SCHEDULE_EDIT_RESPONSE} from "../../angular-xapi/lms.service";



type iShow = {
    more_total_schedule_warning: boolean;
    more_icon_desc: boolean;
};

interface SESSION {
  d: any;
  f: any;
  i: any;
  e: any;
  o: any;
  w: any;
  p: any;
  r: any;
  s: any;
  n: any;
};

interface SCHEDULE {
  t: any;
  b: any;
  u: any;
  p: any;
  a: any;
};



@Component({
  selector: 'schedule-table-page',
  templateUrl: 'schedule-table.html'
})
export class ScheduleTablePage {


  DATE = 'd';
  DAYOFF = 'f';
  IDX_RESERVATION = 'i';
  IDX_SCHEDULE = 'e';
  OPEN = 'o';
  OWNER = 'w';
  POINT = 'p';
  PRERE = 'r';
  STATUS = 's';
  STUDENT_NAME = 'n';

  IDX_TEACHER = 't';
  CLASS_BEGIN = 'b';
  USER_TIME_CLASS_BEGIN = 'u';
  DURATION = 'a';


  default_photo_url = window['url_backend'] + "/wp-content/plugins/xapi-2/lms/img/default-teacher-photo.jpg"
  @ViewChild('content') content;
  show: iShow = {
    more_total_schedule_warning: false,
    more_icon_desc: false
  };

  
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
  schedule_table_rows: Array< SESSION > = []; // whole table rows;
  length_of_schedule_table_rows = 0; // total length of schedule table rows.
  no_schedule = false; // If the teacher has no schedule table, it sets to true.
  student = {};
  ___teacher = { age: 0, gender: '', name: '', idx: 0, photoURL: '', grade: 0 };
  teachers = [];





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


  // @remove at 2017-12-30
  // status = {
  //   future: "radio-button-off",
  //   past: "remove"
  // };

  private typing = new Subject<string>();

  singleTeacher = null;
  time = null;
  timer = null;
  urlYoutube = null;

  no_of_schedules = 0;
  // no_of_schedule_limit = 0;

  // page_no = 1;
  navigate = 'today';

  begin_hours = Array(24).fill(0).map( (e, i) => i );
  end_hours = Array(24).fill(0).map( (e, i) => i+1 );
  class_begin_hour = 0;
  class_end_hour = 0;


  // in_displaying_schedule = false; ///
  status = null;
  status_n = 0;

  
  constructor(
    public a: AppService,
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    public youtube: YoutubeVideoPlayer,
    // public cdr: ChangeDetectorRef
  ) {


    this.params = navParams.data;
    this.singleTeacher = this.params.ID;

    if (this.singleTeacher) {
      this.days = 7;
      this.class_begin_hour = 0;
      this.class_end_hour = 24;
    }
    else {
      this.days = 6;
      this.class_begin_hour = 18;
      this.class_end_hour = 23;
    }

    // console.log('data params', this.params);



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



  ngAfterViewInit() {
  }


  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }


  icon(session: SESSION) {
    if (session[ this.STATUS ] == 'future') {
      if (session[ this.OPEN ] == 'open') { // open to reserve
        if (session[ this.DAYOFF ] == 'dayoff') return 'cloud-circle'; // but day off
        else return 'radio-button-off'; // reservable
      }
      
      else if (session[ this.OPEN ] == 'reserved') { // already reserved.
        if (session[ this.OWNER ] == 'me' && ! session[ this.DAYOFF ] ) {
          return 'radio-button-on';
        }
        else if (session[ this.DAYOFF ] == 'dayoff') return 'cloud-done'; // already reserved and day-off
        else return 'checkmark'; // reserved
      }
      else if (session[ this.OPEN ] == 'no-schedule') { // teacher didn't open a session on this day of his schedule table.
        return 'qr-scanner'; // no schedule on this day.
      }
    } // eo future
    else { /// past classes.
      if (session[ this.OPEN ] == 'open') { // past class. but open.
        return 'square';
      }
      else { // past & reserved.
        if (session[ this.DAYOFF ] == 'dayoff') return ''; // past class and dayoff.
        else return 'lock'; // past class and reserved.

      }
    }
  }

  session_text(session: SESSION ) {
    if (session[ this.STATUS ] == 'future') {
      if (session[ this.OPEN ] == 'reserved') {
        if (session[ this.OWNER ] == 'me') {
          return '취소';
        }
      }
      else if ( session[ this.OPEN ] == 'open' ) {
        // return '예약';
        return '';
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
      navigate: this.navigate,
      starting_day: this.starting_day,
      display_weekends: this.displayWeekends ? 'Y' : 'N',
      min_point: this.min_point,
      max_point: this.max_point,
      class_begin_hour: this.class_begin_hour,
      class_end_hour: this.class_end_hour
    };

    const req = Object.assign(defaults, options);
    // console.log("Request: ", req);
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
    // console.log(opt);
    this.status = 'LOADING SCHEDULE';
    this.a.lms.schedule_table(opt).subscribe(re => {
      this.displayScheduleTable(re);
      if ( callback ) callback();
      if (Object.keys(re['schedule']).length == 0) {
        this.a.alert('선생님의 수업 시간표가 없습니다.');
      }
    }, e => this.a.alert(e));
  }

  displayScheduleTable(re) {
    this.status = 'GOT SCHEDULE';
    // console.log('got data: ', re);
    /// 시간표 속도 : https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.xxaqipe33arp
    this.no_of_schedules = re.no_of_schedules;
    // this.no_of_schedule_limit = re.no_of_schedule_limit;

    this.starting_day = re.starting_day;

    this.header = re.header;
    this.schedules = re.schedule; // whole schedules
    this.student = re.student;
    this.___teacher = re.teacher;


    // setTimeout(() => {
    //   // this.schedule_table_rows = re.table;
    //   console.log(this.schedule_table_rows);
    //   // this.re = re;
    // }, 100);

    if ( ! re.table || ! re.table.length ) this.no_schedule = true;
    this.length_of_schedule_table_rows = re.table.length;
    this.schedule_table_rows = [];
    // this.in_displaying_schedule = true;
    this.teachers = re.teachers;

    if ( this.singleTeacher ) {                 // no delay push on single teacher.
      this.schedule_table_rows = re.table;
      this.finishedOnScheduleTableDisplay();
    }
    else this.delayPush( re.table );
  }
  finishedOnScheduleTableDisplay() {
    // this.in_displaying_schedule = false;
    // this.status = null;
    this.status_n = 0;

    this.status = 'SCHEDULE DISPLAYED';
    setTimeout( () => this.status = null, 1500 );
    // console.log('table rows: ', this.schedule_table_rows);
  }

  delayPush( table ) {
    setTimeout( () => {
      if ( ! table || ! table.length ) {
        this.finishedOnScheduleTableDisplay();
      }
      else {
        const len = table.length;
        this.status_n = this.length_of_schedule_table_rows - len;
        this.status = 'DISPLAYING SCHEDULE';
        for( let i = 0; i < 10 && i < len; i ++ ) {
          this.schedule_table_rows.push( table.shift() );
        }
        this.delayPush( table );
      }
    }, 200 );

    // console.log("schedule_table_rows:: ", this.schedule_table_rows);
  }

  schedule(idx_schedule): SCHEDULE {
    if ( typeof idx_schedule !== 'number' && typeof idx_schedule !== 'string' ) { // get idx schedule from session[0]
      idx_schedule = idx_schedule[ this.IDX_SCHEDULE ]; // idx_schedule is session;
    }
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


      this.time = date.getDate() + '일 ' + ap + ' ' + hour + '시 ' + date.getMinutes() + '분'; // + date.getSeconds() + '초';
    }
    this.timer = setTimeout(() => this.updateTime(), 1000);
  }


  /**
   * Returns teacher information
   * @param session session of the reservation table
   */
  teacher( session = null ) {
    if ( session == null ) return null;
    // console.log("tl: ", this.teachers.length );
    // if ( this.teachers.length == 0 ) return null;
    const idx_teacher = this.schedules[ session[ this.IDX_SCHEDULE ] ][ this.IDX_TEACHER ];
    // console.log('idx_schedule: ', session.idx_schedule);
    // console.log('idx_teacher: ', idx_teacher);
    if ( this.teachers[ idx_teacher ] ) return this.teachers[idx_teacher];
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
    return name;

    // return this.a.preTeacherName( name );
  }

  /**
   *
   * @param session
   */
  teacher_photoURL(session = null) {
    // console.log("session: ", session.idx_teacher);
    const teacher = this.teacher( session );
    // console.log(teacher);
    if ( teacher ) {
      if ( teacher.photoURL !== void 0 ) return teacher.photoURL;
      else return this.default_photo_url;
    }
    else return this.___teacher.photoURL;
  }
  teacher_ID(session = null) {
    // const teacher = this.teacher( session );
    const idx_teacher = this.schedules[ session[ this.IDX_SCHEDULE ] ][ this.IDX_TEACHER ];
    return idx_teacher;
    // if ( teacher ) return teacher.idx;
    // else return this.___teacher.idx;
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
    const schedule = this.schedule(session[ this.IDX_SCHEDULE ]);
    if ( ! schedule ) return 0;
    const begin = schedule[ this.USER_TIME_CLASS_BEGIN ];
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
    // console.log(this.navigate);
    this.loadScheduleTable();
  }

  onClickSession(session: SESSION) {

    // console.log('onClickSession', session);
    if (session[ this.STATUS ] == 'past') return;

    if (session[ this.OPEN ] == 'open') this.reserveSession(session);
    else if (session[ this.OPEN ] == 'reserved' && session[ this.OWNER ] == 'me') this.cancelSession(session);

  }

  reserveSession(session: SESSION) {

    // console.log("reserve: session: ", session);
    // const schedule = this.schedule(session[ this.IDX_SCHEDULE ]);
    // console.log("reserve: schedule: ", schedule);

    session['in_progress'] = true;
    this.a.lms.session_reserve({ idx_schedule: session[ this.IDX_SCHEDULE ], date: session[ this.DATE ] }).subscribe(re => {
      // console.log("class_reserve: ", re);
      session['in_progress'] = false;
      session[ this.OPEN ] = 'reserved';
      session[ this.DAYOFF ] = '';
      session[ this.STATUS ] = 'future';
      session[ this.OWNER ] = 'me';
      session[ this.STUDENT_NAME ] = re.student_name;
      session[ this.POINT ] = re.point;
      session[ this.IDX_RESERVATION ] = re.idx_reservation;
      this.updatePoint();
    }, e => {
      session['in_progress'] = false;
      this.a.alert(e);
    });

  }

  cancelSession( session: SESSION ) {
    session['in_progress'] = true;
    // console.log("Going to cancel with : ", session[ this.IDX_RESERVATION ]);
    this.a.lms.session_cancel(session[ this.IDX_RESERVATION ]).subscribe(re => {
      // console.log("cancel success", re);
      session['in_progress'] = false;
      session[ this.STATUS ] = 'future';
      session[ this.OPEN ] = 'open';
      session[ this.OWNER ] = '';
      session[ this.STUDENT_NAME ] = '';
      session[ this.POINT ] = this.schedule(session[ this.IDX_SCHEDULE ])[ this.POINT ] ;
      this.updatePoint();
    }, e => {
      session['in_progress'] = false;
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

    // console.log('onClickReserveVisible', sessions);


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
    // console.log($event['checked']);

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


  point( session ) {
    if (session[ this.STATUS ] == 'future') {
      if (session[ this.OPEN ] == 'open') {
        if (session[ this.DAYOFF ] != 'dayoff') return session[ this.POINT ];
      }
      else if (session[ this.OPEN ] == 'reserved') { // already reserved.
        if ( session[ this.OWNER ] == 'me' ) {
          return session[ this.POINT ];
        }
      }
    }
    return '';
  }


  // scheduleLoader( str ) {
  //   this.a.alert( { message: str, duration: 1500 } );
  // }
}
