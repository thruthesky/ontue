import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {XapiService} from './xapi.service';
import {UserService} from './user.service';


import {Base} from './base';

export interface SCHEDULE_EDIT extends DAYS {
  idx?: number;
  point: number;
  prere: string;
  class_begin_hour: number;
  class_begin_minute: number;
  duration: number;
}

export interface SCHEDULE extends DAYS {
  idx: number;
  idx_teacher: number;
  class_begin: number;
  class_end: number;
  original_class_begin: number;
  original_class_end: number;
  point: number;
  prere: string;
  stamp_created: number;
  user_time_days: {
    sunday: 'Y' | '',
    monday: 'Y' | '',
    tuesday: 'Y' | '',
    wednesday: 'Y' | '',
    thursday: 'Y' | '',
    friday: 'Y' | '',
    saturday: 'Y' | '',
  }
}


export type SCHEDULE_EDIT_RESPONSE = Array<SCHEDULE>

export interface DAYS {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

export interface TEACHER_LIST {
  ID: number;
  bookable_time: number;
  class_id: string;
  name: string;
  age: number;
  grade: number;
  list_order: number;
  photoURL: string;
  kakao_qrmark_string: string;
}

export type TEACHERS_LIST = Array<TEACHER_LIST>


@Injectable()
export class LMSService extends Base {

  userType = {
    teacher: 'T',
    student: 'S'
  };

  constructor(private x: XapiService,
              private user: UserService) {
    super();
  }


  /**
   * Returns 'student' or 'teacher'.
   */
  getUserType(): '' | 'student' | 'teacher' {
    const profile = this.user.getProfile();
    if (profile['user_type']) {
      if (profile['user_type'] == 'T') return 'teacher';
      else if (profile['user_type'] == 'S') return 'student';
      else return '';
    }
    else return '';
  }

  setUserType(type) {
    let data = {
      session_id: this.user.sessionId,
      route: 'lms.set_user_type',
      type: type
    };
    return this.x.post(data);
  }

  schedule_edit(data: SCHEDULE_EDIT): Observable<SCHEDULE_EDIT_RESPONSE> {
    const defaults = {
      route: 'lms.schedule_edit',
      session_id: this.user.sessionId
    };
    data = Object.assign(defaults, data);
    return this.x.post(data);
  }

  schedule_delete(idx) {
    let data = {
      route: 'lms.schedule_delete',
      session_id: this.user.sessionId,
      idx: idx
    };
    return this.x.post(data);

  }


  /**
   * Returns the timezone offset based on user's browser.
   */
  getUserLocalTimezoneOffset() {

    const localTz = (new Date).getTimezoneOffset() / 60;

    let offset = Math.abs(Math.floor(localTz));
    if (localTz < 0) {
      offset = Math.abs(localTz);
    }
    else {
      offset = -1 * offset;
    }

    return offset;

  }

  timezone(): Observable<string> {
    const data = {
      route: 'lms.timezone_info',
      session_id: this.user.sessionId
    };
    return this.x.post(data);
  }


  /**
   * Get all the timezones.
   */
  timezones(): Observable<any> {
    const data = {
      route: 'lms.timezones_info'
    };
    return this.x.post(data);
  }

  timezone_set(offset): Observable<any> {
    const data = {
      route: 'lms.timezone_set',
      session_id: this.user.sessionId,
      timezone: offset
    };
    return this.x.post(data);
  }


  /**
   * Returns user Date object.
   * @param offset timezone offset
   */
  userDate(offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  }

  /**
   * Returns a time of timezone offset.
   * @param offset timezone offset
   */
  localeString(offset) {
    // console.log('offset: ', offset);
    return this.userDate(offset).toLocaleString();
  }


  my_schedules(): Observable<any> {
    let data = {
      route: 'lms.my_schedule',
      session_id: this.user.sessionId
    };
    return this.x.post(data);
  }

  schedule_search(data) {
    data['route'] = 'lms.schedule_search';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  schedule_table(data) {
    data['route'] = 'lms.new_schedule_table';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  teacher_list(data) {
    data['route'] = 'lms.teacher_list';
    return this.x.post(data);
  }


  session_reserve(data) {
    data['route'] = 'lms.session_reserve';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  session_cancel(idx_reservation) {
    let data = {idx_reservation: idx_reservation};
    data['route'] = 'lms.session_cancel';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  session_search(data) {

    data['route'] = 'lms.session_search';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  my_point() {
    let data = {};
    data['route'] = 'lms.my_point';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  get_dayoffs() {
    let data = {};
    data['route'] = 'lms.dayoff_get';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  set_dayoff(date) {
    let data = {route: 'lms.dayoff_set', session_id: this.user.sessionId, date: date};
    return this.x.post(data);
  }

  delete_dayoff(date) {
    let data = {route: 'lms.dayoff_delete', session_id: this.user.sessionId, date: date};
    return this.x.post(data);
  }


  message(data) {
    data['route'] = 'lms.message';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  message_opened(idx) {
    let data = {
      idx: idx,
      route: 'lms.message_opened',
      session_id: this.user.sessionId
    };
    return this.x.post(data);
  }

  session_refund_request(data) {
    data['route'] = 'lms.session_refund_request';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  session_cancel_refund_request(idx) {
    let data = {};
    data['route'] = 'lms.session_cancel_refund_request';
    data['session_id'] = this.user.sessionId;
    data['idx_reservation'] = idx;
    return this.x.post(data);
  }

  session_refund(idx) {
    let data = {
      idx_reservation: idx,
      route: 'lms.session_refund',
      session_id: this.user.sessionId
    };
    return this.x.post(data);
  }

  session_refund_reject(data) {
    data['route'] = 'lms.session_refund_reject';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }


  payment_information_update(data) {
    data['route'] = 'lms.payment_information_update';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  payment_information() {
    let data = {};
    data['route'] = 'lms.payment_information';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  payment_information_history() {
    let data = {};
    data['route'] = 'lms.payment_information_history';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  session_evaluate(data) {
    data['route'] = 'lms.session_evaluate';
    data['session_id'] = this.user.sessionId;
    console.log(data);
    return this.x.post(data);
  }

  get_session_evaluation(idx) {
    let data = {};
    data['route'] = 'lms.get_session_evaluation';
    data['session_id'] = this.user.sessionId;
    data['idx'] = idx;
    return this.x.post(data);

  }


  /**
   * Gets a page
   * @param req request data
   *
   * @code
   * a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e.message));
   * @endcode
   */
  page(req): any {
    req['route'] = 'lms.page';
    console.log(req);
    return this.x.post(req)
      .map(e => {
        const re = this.x.safe(e);
        this.x.render(500);
        return re;
      });
  }

  update_kakao_qrmark_string() {
    let data = {};
    data['route'] = 'lms.update_kakao_qrmark_string';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  get_payment_history() {
    let data = {};
    data['route'] = 'lms.get_payment_history';
    data['session_id'] = this.user.sessionId;
    return this.x.post(data);
  }

  /**
   * @deprecated
   */
  // stats() {
  //   return this.x.post({route: 'lms.stats'});
  // }

  schedule_available() {
    return this.x.post({
      route: 'lms.schedule_available',
      session_id: this.user.sessionId
    });
  }

  payment_rate() {
    return this.x.post({route: 'lms.payment_rate'});
  }

  /**
   * Gets lms information.
   * @note this should be called once on every boot.
   */
  info() {
    return this.x.post({route: 'lms.info', session_id: this.user.sessionId});
  }


  get_student_comments_to_teacher(req) {
    console.log("get_student_comments_to_teacher", req);
    req['route'] = 'lms.get_student_comments_to_teacher';
    return this.x.post(req)
  }

  student_comment_to_teacher_edit(req) {
    req['route'] = 'lms.student_comment_to_teacher_edit';
    req['session_id'] = this.user.sessionId;
    return this.x.post(req)
  }

  student_comment_to_teacher_delete(req) {
    req['route'] = 'lms.student_comment_to_teacher_delete';
    req['session_id'] = this.user.sessionId;
    return this.x.post(req)
  }

  get_latest_student_comment_to_teachers(){
    return this.x.post({
      route: 'lms.get_latest_student_comment_to_teachers',
    });
  }

  get_teacher_site_info(){
    return this.x.post({
      route: 'lms.get_teacher_site_info',
    });
  }

  update_push_token( token: string, platform: string ) {
    return this.x.post({
      route: 'lms.update_push_token',
      session_id: this.user.sessionId,
      token: token,
      platform: platform
    });
  }

}
