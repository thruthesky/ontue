import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { TEACHERS_LIST } from "../../angular-xapi/lms.service";




@Component({
  selector: 'teacher-list-page',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  display_options = false;
  teachersList: TEACHERS_LIST = [];

  mode = null;
  re: any;
  teachers = [];

  gender = '';
  recommend = 'Y';
  page_no: number;
  limit = 60; // default should be 100 or more numbers NOT to scroll. Instead, put a option button to show all teachers.

  noMoreTeachers: boolean;
  loading: boolean;

  title = '수업예약';
  constructor(
    public nav: NavParams,
    public a: AppService
  ) {
    this.mode = nav.get('mode');

    if ( this.mode == 'leveltest' ) this.title = '레벨테스트';
    else this.title = '수업예약'
    this.init();
    this.loadTeachers();
  }

  init() {
    this.teachers = [];
    this.page_no = 1;
    this.noMoreTeachers = false;
  }

  onClickTeacher(teacher) {
    // console.log(teacher);
    this.a.open('schedule-table', teacher);
  }


  loadTeachers() {
    this.loading = true;
    this.a.lms.teacher_list({
      gender: this.gender,
      recommend: this.recommend,
      page_no: this.page_no,
      limit: this.limit
    }).subscribe(re => {
      this.loading = false;
      // console.log(re);
      this.re = re;
      this.teachers = this.teachers.concat( this.re.teachers );
      if ( this.re.teachers.length < this.limit ) {
        this.noMoreTeachers = true;
      }
    }, e => this.a.alert(e));
  }



  onChangeRecommend() {
    this.init();
    this.loadTeachers();
  }
  onChangeGender() {
    this.init();
    this.loadTeachers();
  }

  onClickShowMoreTeacher() {
    this.page_no ++;
    this.loadTeachers();
  }

  onClickShowAllTeachers() {
    this.display_options = true;
    document.querySelector('.scroll-content').scrollTo(0,0);
  }

}
